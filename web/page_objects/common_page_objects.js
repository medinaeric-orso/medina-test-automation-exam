class CommonPageObjects {
  constructor(page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'Go to the cheapflights homepage' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.cookieAcceptButton = page.getByRole('button', { name: /accept|agree|i understand|ok/i });
    this.cookieSettingsButton = page.getByRole('button', { name: 'Cookie settings' });
  }
}

module.exports = { CommonPageObjects };
