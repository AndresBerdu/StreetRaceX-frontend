import { useState, useEffect } from "react";

const cache: Record<string, string> = {};

export const useUsername = (slugs: string[]) => {
  const [usernames, setUsernames] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!slugs.length) return;

    const uniqueSlugs = [...new Set(slugs)].filter(Boolean);

    const resolve = async () => {
      const result: Record<string, string> = { ...cache };
      const toFetch = uniqueSlugs.filter((s) => !cache[s]);

      await Promise.all(
        toFetch.map(async (slug) => {
          try {
            const res = await fetch(`http://localhost:8000/api/users/${slug}`, {
              credentials: "include",
            });
            const json = await res.json();
            const username = json?.data?.username ?? slug;
            cache[slug] = username;
            result[slug] = username;
          } catch {
            result[slug] = slug;
          }
        }),
      );

      setUsernames(result);
    };

    resolve();
  }, [slugs.join(",")]);

  return usernames;
};
