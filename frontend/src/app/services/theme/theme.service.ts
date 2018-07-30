import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {

  private readonly THEME_HEADER: string = "theme";
  private body: any;

  constructor() {
    this.body = document.body || document.documentElement;
  }

  public initTheme(): any {
    if(localStorage.getItem(this.THEME_HEADER) == null) {
      localStorage.setItem(this.THEME_HEADER, "light");
    }
    else {
      this.switchTheme(localStorage.getItem(this.THEME_HEADER));
    }
  }

  public isDarkTheme(): boolean {
    return localStorage.getItem(this.THEME_HEADER) == "dark";
  }

  public switchTheme(theme: string): void {
    if(theme == "dark") {
      this.body.classList.add("dark-theme");
      localStorage.setItem(this.THEME_HEADER, "dark");
    }
    else {
      this.body.classList.remove("dark-theme");
      localStorage.setItem(this.THEME_HEADER, "light");
    }
  }

}
