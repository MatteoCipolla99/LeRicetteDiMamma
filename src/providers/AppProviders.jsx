import { AuthProvider } from "../context/AuthContext";
import { RecipeProvider } from "../context/RecipeContext";
import { ShoppingListProvider } from "../context/ShoppingListContext";
import ErrorBoundary from "../components/ErrorBoundary";

// Pattern "Compose" per appiattire la piramide
const Compose = ({ components = [], children }) => {
  return components.reduceRight((acc, Comp) => <Comp>{acc}</Comp>, children);
};

export const AppProviders = ({ children }) => {
  return (
    <ErrorBoundary>
      <Compose
        components={[AuthProvider, RecipeProvider, ShoppingListProvider]}
      >
        {children}
      </Compose>
    </ErrorBoundary>
  );
};
