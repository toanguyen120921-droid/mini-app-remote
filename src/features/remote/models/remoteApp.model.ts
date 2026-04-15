export interface RemoteCapability {
  id: string;
  title: string;
}

export const REMOTE_CAPABILITIES: RemoteCapability[] = [
  {id: "discover", title: "Discover curated movie collections"},
  {id: "trailers", title: "Open trailer and detail actions"},
  {id: "watchlist", title: "Save titles to a lightweight watchlist"},
];

export const REMOTE_CONTENT = {
  title: "Movies App",
  subtitle: "Mini app for browsing movies, trailers, and watchlist picks",
  sectionTitle: "Movie features",
  howItWorksTitle: "Why this remote exists",
  howItWorksDescription:
    "Movies App runs as an independent remote and can also be loaded inside the host app through Module Federation with Re.Pack.",
  buttonLabel: "Open Trailer Action",
  updateButtonLabel: "Reload Movies App",
  alertTitle: "Now playing",
  alertMessage:
    "Trailer action placeholder. Replace this with your movie detail flow or player entry point.",
};
