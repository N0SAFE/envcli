export const regex = /\$:\{([^}]*)\}/g;

export const transformEnv = (s: string, env: Record<string, string>) =>
    s.replace(regex, (match, p1: string) => {
        // p1 is the captured group, which is the name of the environment variable
        return env[p1] !== undefined ? env[p1] : match;
    });
