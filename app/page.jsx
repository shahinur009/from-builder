import ClientProviders from './(components)/_client_providers';
import MainAppContent from './(components)/MainAppContent';


export default function HomePage() {
  return (
    <ClientProviders>
      <MainAppContent />
    </ClientProviders>
  );
}
