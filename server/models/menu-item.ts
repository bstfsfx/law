import mongoose, { Schema } from 'mongoose';

export interface MenuItemRecord {
  name: string;
  note: string;
  image: string;
  alt: string;
  sortOrder: number;
  visible: boolean;
}

const menuItemSchema = new Schema<MenuItemRecord>(
  {
    name: { type: String, required: true, trim: true },
    note: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    visible: { type: Boolean, default: true }
  },
  { timestamps: true, collection: 'menu_items' }
);

export const MenuItem =
  (mongoose.models['MenuItem'] as mongoose.Model<MenuItemRecord> | undefined) ??
  mongoose.model<MenuItemRecord>('MenuItem', menuItemSchema);
