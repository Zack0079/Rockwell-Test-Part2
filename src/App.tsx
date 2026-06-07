import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounterStore } from "@/stores/counter-store";

export default function App() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Rockwell Dev Test — Part 2</CardTitle>
          <CardDescription>
            Starter is ready. Delete this demo and build the component from the Figma brief.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Stack check: React 19, Vite, TypeScript, Tailwind, shadcn/ui, Zustand.
          </div>
          <div className="flex items-center justify-between rounded-md border p-4">
            <span className="text-sm">Zustand counter</span>
            <span className="font-mono text-lg">{count}</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={decrement} variant="outline">
              −
            </Button>
            <Button onClick={increment}>+</Button>
            <Button onClick={reset} variant="ghost">
              reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
