import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedCandidates');
    if (stored) {
      setSaved(JSON.parse(stored));
    }
  }, []);

  if (!saved.length) {
    return <div>No candidates have been accepted</div>;
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      {saved.map((candidate, idx) => (
        <div key={idx}>
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location || 'N/A'}</p>
          <img src={candidate.avatar_url} alt={candidate.login} />
          <p>Company: {candidate.company || 'N/A'}</p>
          <p>Email: {candidate.email || 'N/A'}</p>
          <a href={candidate.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
        </div>
      ))}
    </>
  );
};

export default SavedCandidates;
