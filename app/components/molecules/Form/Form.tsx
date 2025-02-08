import React from 'react';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  return (
    <p ref={ref} className="text-sm font-medium text-destructive" {...props}>
      {children}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export { FormMessage };
