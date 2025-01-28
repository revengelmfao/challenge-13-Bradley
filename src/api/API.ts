
export async function searchGithub(query: string) {
  const response = await fetch(`https://api.github.com/search/users?q=${query}`);
  const data = await response.json();
  return data;
}

export async function searchGithubUser(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data;
}