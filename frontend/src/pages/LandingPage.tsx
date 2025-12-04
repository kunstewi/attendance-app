import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Welcome to Attendance App
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Manage your attendance efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
