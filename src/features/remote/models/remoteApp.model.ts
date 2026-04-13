export interface RemoteCapability {
  id: string;
  title: string;
}

export const REMOTE_CAPABILITIES: RemoteCapability[] = [
  {id: 'button', title: 'Button - Custom button component'},
  {id: 'card', title: 'Card - Display card component'},
];

export const REMOTE_CONTENT = {
  title: 'Remote App',
  subtitle: 'Mini app exposing shared components',
  sectionTitle: 'Exposed Components NQ1T11',
  howItWorksTitle: 'How it works',
  howItWorksDescription:
    'Remote App runs independently or exposes components to the Host App via Module Federation. Each app has its own Re.Pack (Webpack) bundler.',
  buttonLabel: 'Remote Button',
  updateButtonLabel: 'Update Mini App',
  alertTitle: 'Remote App',
  alertMessage: 'Component from Remote!',
};

