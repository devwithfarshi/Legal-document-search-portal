import { useState } from "react";
import type { IDocuments } from "./_types/types";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Spinner } from "./components/ui/spinner";

const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<IDocuments[]>([]);
  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Input can't be empty.");
      return;
    }
    setResults([]);
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/generate?query=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = (await response.json()) as {
        related_documents: IDocuments[];
      };
      setResults(data.related_documents);
    } catch (error: unknown) {
      console.log("Error on search : ", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center pt-32 bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Legal Document Assistant</h1>
      <div className="flex gap-2 max-w-lg mb-6 w-full">
        <Input
          placeholder="Enter your legal query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button disabled={!query || loading} onClick={handleSearch}>
          {loading ? <Spinner /> : "Search"}
        </Button>
      </div>
      {loading ? (
        <p className="text-gray-500 animate-pulse">Analyzing documents...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : null}
      <div className="grid gap-4 max-w-lg w-full">
        {results.length > 0
          ? results.map((curDoc) => (
              <Card key={curDoc.id}>
                <CardContent>
                  <CardHeader>
                    <CardTitle>{curDoc.title}</CardTitle>
                    <CardDescription>{curDoc.content}</CardDescription>
                  </CardHeader>
                </CardContent>
              </Card>
            ))
          : !loading && (
              <p className="text-gray-500">
                No results to display. Please enter a query and click "Search".
              </p>
            )}
      </div>
    </div>
  );
};
export default App;
