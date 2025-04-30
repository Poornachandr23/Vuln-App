import { AlertTriangle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t bg-secondary/50">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          <AlertTriangle className="inline-block h-4 w-4 mr-1 text-destructive" />
          Built by <span className="font-medium">Firebase Studio</span>. This application is intentionally vulnerable for educational purposes. Do not deploy in production.
        </p>
      </div>
    </footer>
  );
}
