import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      UPDATE scenarios
      SET title = ?,
          description = ?,
          details = ?,
          benefits = ?,
          implementation = ?,
          category_id = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *
    `).get(
      data.title,
      data.description,
      data.details,
      JSON.stringify(data.benefits),
      data.implementation,
      category.id,
      params.id
    );

    return NextResponse.json({ ...scenario, category_name: category.name });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update scenario' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    db.prepare('DELETE FROM scenarios WHERE id = ?').run(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete scenario' }, { status: 500 });
  }
}