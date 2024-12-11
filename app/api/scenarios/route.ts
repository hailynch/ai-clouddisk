import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const scenarios = db.prepare(`
      SELECT 
        s.*,
        c.name as category_name,
        c.icon as category_icon
      FROM scenarios s
      JOIN categories c ON s.category_id = c.id
    `).all();

    return NextResponse.json(scenarios);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch scenarios' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Find or create category
    const category = db.prepare(`
      INSERT INTO categories (name, icon)
      VALUES (?, ?)
      ON CONFLICT(name) DO UPDATE SET
        icon = excluded.icon
      RETURNING *
    `).get(data.category, data.icon || 'Brain');

    const scenario = db.prepare(`
      INSERT INTO scenarios (
        title, description, details, benefits,
        implementation, category_id
      ) VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *
    `).get(
      data.title,
      data.description,
      data.details,
      JSON.stringify(data.benefits),
      data.implementation,
      category.id
    );

    return NextResponse.json({ ...scenario, category_name: category.name });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create scenario' }, { status: 500 });
  }
}