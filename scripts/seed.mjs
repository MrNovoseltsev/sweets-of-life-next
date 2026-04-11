/**
 * Seed script: импортирует products.json и news.json в Supabase.
 * Запуск: npm run seed
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ── Загрузка .env.local ───────────────────────────────────────────────────────

const envPath = join(root, '.env.local');
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !(key in process.env)) process.env[key] = val;
  }
}

// ── Supabase client с service role (обходит RLS) ─────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌  Не задан NEXT_PUBLIC_SUPABASE_URL');
  process.exit(1);
}
if (!serviceRoleKey) {
  console.error('❌  Не задан SUPABASE_SERVICE_ROLE_KEY');
  console.error('    Взять в Supabase: Project Settings → API → service_role (secret)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// ── Парсинг русских дат ("23 июля 2015" → "2015-07-23") ──────────────────────

const RU_MONTHS = {
  января: '01', февраля: '02', марта: '03', апреля: '04',
  мая: '05', июня: '06', июля: '07', августа: '08',
  сентября: '09', октября: '10', ноября: '11', декабря: '12',
};

function parseRuDate(str) {
  const [day, monthRu, year] = str.trim().split(/\s+/);
  const month = RU_MONTHS[monthRu];
  if (!month) throw new Error(`Неизвестный месяц: "${monthRu}" в "${str}"`);
  return `${year}-${month}-${day.padStart(2, '0')}`;
}

// ── Seed: products ────────────────────────────────────────────────────────────

async function seedProducts() {
  const raw = JSON.parse(readFileSync(join(root, 'src/data/products.json'), 'utf8'));

  const rows = raw.map((p) => ({
    sku:           p.sku,
    category:      p.category,
    name:          p.name,
    price:         p.price,
    type:          p.type,
    material:      p.material,
    decoration:    p.decoration ?? null,
    hardware:      p.hardware ?? null,
    size:          p.size,
    description:   p.description,
    image_full:    p.image.full,
    image_preview: p.image.preview,
  }));

  const { error } = await supabase
    .from('products')
    .upsert(rows, { onConflict: 'sku' });

  if (error) {
    console.error('❌  products:', error.message);
    process.exit(1);
  }

  console.log(`✅  products: ${rows.length} записей`);
}

// ── Seed: news ────────────────────────────────────────────────────────────────

async function seedNews() {
  const raw = JSON.parse(readFileSync(join(root, 'src/data/news.json'), 'utf8'));

  const rows = raw.map((n) => ({
    slug:           n.id,
    published_date: parseRuDate(n.date),
    title:          n.title,
    excerpt:        n.excerpt,
    image:          n.image,
    url:            n.url ?? null,
  }));

  const { error } = await supabase
    .from('news')
    .upsert(rows, { onConflict: 'slug' });

  if (error) {
    console.error('❌  news:', error.message);
    process.exit(1);
  }

  console.log(`✅  news: ${rows.length} записей`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log('🌱  Запуск seed...\n');
await seedProducts();
await seedNews();
console.log('\n🎉  Готово!');
