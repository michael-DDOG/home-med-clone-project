import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { migrateProductsToSupabase, verifyMigration } from '@/utils/migrateProducts';

const DataMigration = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count?: number; error?: any } | null>(null);

  const handleMigration = async () => {
    setIsRunning(true);
    setResult(null);

    // First verify if there are already products
    const verification = await verifyMigration();
    if (verification.success && verification.count && verification.count > 0) {
      setResult({
        success: true,
        count: verification.count,
        error: 'Products already exist in the database. Migration not needed.'
      });
      setIsRunning(false);
      return;
    }

    // Run migration
    const migrationResult = await migrateProductsToSupabase();
    setResult(migrationResult);
    setIsRunning(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Product Data Migration
        </CardTitle>
        <CardDescription>
          Migrate product data from local files to Supabase database for efficient querying.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleMigration} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Migrating Products...
            </>
          ) : (
            'Migrate Products to Supabase'
          )}
        </Button>

        {result && (
          <Alert>
            {result.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>
              {result.success ? (
                result.error ? (
                  result.error
                ) : (
                  `✅ Successfully migrated ${result.count} products to Supabase!`
                )
              ) : (
                `❌ Migration failed: ${result.error?.message || 'Unknown error'}`
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="mb-2">This migration will:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Transfer all product data to Supabase</li>
            <li>Enable efficient querying for 3000+ products</li>
            <li>Improve page load performance</li>
            <li>Enable real-time updates and better scalability</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataMigration;