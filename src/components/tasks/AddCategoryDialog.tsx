import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/contexts/TaskContext';

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddCategoryDialog = ({ open, onOpenChange }: AddCategoryDialogProps) => {
  const { addCategory } = useTaskContext();
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#3b82f6');

  const handleAddCategory = () => {
    if (categoryName.trim() === '') {
      return;
    }

    addCategory({
      name: categoryName,
      color: categoryColor,
    });
    
    // Reset form and close dialog
    setCategoryName('');
    setCategoryColor('#3b82f6');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100 text-base">Add New Category</DialogTitle>
          <DialogDescription className="dark:text-gray-300 text-xs">
            Create a custom category with a color
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-3">
          <div className="grid gap-1.5">
            <Label htmlFor="category-name" className="dark:text-gray-200 text-xs">Category Name</Label>
            <Input 
              id="category-name" 
              value={categoryName} 
              onChange={(e) => setCategoryName(e.target.value)} 
              placeholder="Enter category name" 
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-8 text-xs"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="category-color" className="dark:text-gray-200 text-xs">Category Color</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: categoryColor }}
              ></div>
              <Input 
                id="category-color" 
                type="color"
                value={categoryColor} 
                onChange={(e) => setCategoryColor(e.target.value)} 
                className="w-20 h-8 p-1"
              />
            </div>
            <div className="grid grid-cols-8 gap-1.5 mt-1">
              {[
                '#ef4444', // red
                '#f97316', // orange
                '#f59e0b', // amber
                '#10b981', // emerald
                '#3b82f6', // blue
                '#8b5cf6', // violet
                '#d946ef', // pink
                '#64748b', // slate
              ].map(color => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 ${categoryColor === color ? 'ring-1 ring-offset-1 ring-gray-500 dark:ring-gray-300' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCategoryColor(color)}
                  type="button"
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="dark:border-gray-600 dark:text-gray-200 text-xs h-8">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} className="text-xs h-8">Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
