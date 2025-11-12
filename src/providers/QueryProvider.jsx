import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();

const QueryProvider = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default QueryProvider;
