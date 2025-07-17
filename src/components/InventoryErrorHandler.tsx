
import { toast } from "sonner";

export const handleInventoryError = (error: any, operation: string) => {
  console.error(`Error during ${operation}:`, error);
  
  // Check for specific error types
  if (error?.code === 'PGRST301') {
    toast.error(`Failed to ${operation}: Row Level Security policy violation. Please check permissions.`);
  } else if (error?.code === '23503') {
    toast.error(`Failed to ${operation}: This item is referenced by other records and cannot be deleted.`);
  } else if (error?.code === '23505') {
    toast.error(`Failed to ${operation}: Duplicate entry found. Please use a unique identifier.`);
  } else if (error?.message) {
    toast.error(`Failed to ${operation}: ${error.message}`);
  } else {
    toast.error(`Failed to ${operation}: An unexpected error occurred. Please try again.`);
  }
};
