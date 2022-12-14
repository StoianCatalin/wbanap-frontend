import { AuthContext } from "contexts/authContext";
import { useContext, useEffect, useState } from "react"
import { userApiService } from "services/api/UserApiService";


export function useDocumentsFilters() {
  const [sourcesOfInterest, setSourcesOfInterest] = useState<string[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const sources = user?.sourcesOfInterest ?? [];
    setSourcesOfInterest(sources)
  }, [user?.sourcesOfInterest])


  const updateSourcesOfInterest = async (sources: string[]) => {
    setSourcesOfInterest(sources);
    await userApiService.updateSourcesOfInterest(sources);
  }

  return {
    sourcesOfInterest,
    updateSourcesOfInterest,
  }
}