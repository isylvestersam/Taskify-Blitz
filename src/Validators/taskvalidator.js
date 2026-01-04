


export const validateCreateTask = (task) => {
  if (!task.name || task.name.trim() === '') {
    return { success: false, error: 'Task must have a name' };
  }

  if (!task.category || task.category.trim() === '') {
    task.category = 'General';
  }

  if (!task.maxPoints || typeof task.maxPoints !== 'number' || task.maxPoints <= 0) {
    return { success: false, error: 'Task must have valid maxPoints' };
  }

  if (!task.occurrence || !['Daily','Weekly','Specific Days'].includes(task.occurrence.type)) {
    return { success: false, error: 'Task must have a valid occurrence type' };
  }

  if (task.occurrence.type === 'Specific Days') {
    if (!Array.isArray(task.occurrence.days) || task.occurrence.days.some(d => d < 0 || d > 6)) {
      return { success: false, error: 'Specific Days must have an array of weekdays (0-6)' };
    }
  }

  // Set defaults
  if (!task.color) task.color = '#5C6AC4';
  if (!task.occurrence.days) task.occurrence.days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  if (task.occurrence.type === 'Daily') task.occurrence.days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  return { success: true, task }; // return the potentially updated task
}

// Validate Task Editing
export const validateEditTask = (updates) => {
  // Only check fields that exist in updates
  if (updates.name !== undefined && updates.name.trim() === '') {
    return { success: false, error: 'Task name cannot be empty' };
  }

  if (updates.category !== undefined && updates.category.trim() === '') {
    return { success: false, error: 'Task category cannot be empty' };
  }

  if (updates.maxPoints !== undefined && (typeof updates.maxPoints !== 'number' || updates.maxPoints <= 0)) {
    return { success: false, error: 'maxPoints must be a number greater than 0' };
  }

  if (updates.occurrence !== undefined) {
    if ([!'Daily','Weekly','Specific Days'].includes(updates.occurrence.type)) {
      return { success: false, error: 'Invalid occurrence type' };
    }

    if (updates.occurrence.type === 'Specific Days') {
      if (!Array.isArray(updates.occurrence.days) || updates.occurrence.days.some(d => d < 0 || d > 6)) {
        updates.occurrence.days = []; // default empty array for safety
      }
    }
  }

  // Set defaults if missing
  if (updates.color === undefined) updates.color = '#5C6AC4';
  if (updates.occurrence?.type === 'Specific Days' && updates.occurrence.days === undefined) {
    updates.occurrence.days = [];
  }

  return { success: true, updates };
}



