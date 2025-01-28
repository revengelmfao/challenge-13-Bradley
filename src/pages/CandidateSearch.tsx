import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saved, setSaved] = useState<any[]>(() => {
    const stored = localStorage.getItem('savedCandidates');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    (async () => {
      const results = await searchGithub('react');
      const detailedCandidates = await Promise.all(
        results.items.map(async (item: any) => {
          const userDetails = await searchGithubUser(item.login);
          return { ...item, ...userDetails };
        })
      );
      setCandidates(detailedCandidates || []);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(saved));
  }, [saved]);

  if (!candidates.length || currentIndex >= candidates.length) {
    return <div>No more candidates</div>;
  }

  const candidate = candidates[currentIndex];
  const handleAdd = () => {
    setSaved([...saved, candidate]);
    setCurrentIndex(currentIndex + 1);
  };
  const handleSkip = () => {
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      <h2>{candidate.name}</h2>
      <p>Username: {candidate.login}</p>
      <p>Location: {candidate.location || 'N/A'}</p>
      <img src={candidate.avatar_url} alt={candidate.login} />
      <p>Company: {candidate.company || 'N/A'}</p>
      <p>Email: {candidate.email || 'N/A'}</p>
      <a href={candidate.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
      <br />
      <button onClick={handleAdd}>+</button>
      <button onClick={handleSkip}>-</button>
    </div>
  );
};

export default CandidateSearch;
