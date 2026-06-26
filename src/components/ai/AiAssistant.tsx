'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from '@/components/common/Loader';
import { AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AiAssistantProps {
  onAction: (actionType: string) => Promise<string>;
  title: string;
  description: string;
  buttonLabel: string;
}

export function AiAssistant({
  onAction,
  title,
  description,
  buttonLabel,
}: AiAssistantProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await onAction(title);
      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-transparent dark:border-purple-900 dark:from-purple-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              {result}
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleAction}
          disabled={loading}
          className="w-full"
          variant="default"
        >
          {loading ? <Loader size="sm" /> : buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
