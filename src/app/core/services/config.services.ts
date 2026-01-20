import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config: any = null;

    constructor() { }

    loadConfig(): Promise<void> {
        return fetch('/assets/config.json')
            .then(res => res.json())
            .then(config => {
                this.config = config;
                console.log('Config loaded:', config);
            })
            .catch(error => {
                console.error('Failed to load config:', error);
                throw error;
            });
    }

    getApiHost(): string {
        return this.config?.apiHost || '';
    }
}