export default function UpdateSessionTokens(sessionContext ,accessToken, refreshToken) {
    const newSession = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        isLoadingSession: true,
      }
      sessionContext.setSession(newSession)
      localStorage.setItem("session", JSON.stringify(newSession));
}