#!/usr/bin/env python3
"""
Script to update SpurtLinks design files with sidebar navigation template.
Usage: python3 update_sidebar.py
"""

import os
import re

# Define the sidebar HTML template
SIDEBAR_TEMPLATE = '''    <!-- Sidebar -->
    <aside class="sidebar">
        <a href="#" class="sidebar-logo">
            <div class="sidebar-logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 7V12C3 19.7 12 22 12 22S21 19.7 21 12V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 12L10 15L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </a>

        <nav class="sidebar-nav">
            <a href="#" class="nav-item {active_discover}" title="Discover">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 3"/></svg>
            </a>
            <a href="#" class="nav-item {active_matches}" title="Matches">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </a>
            <a href="#" class="nav-item {active_chat}" title="Chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </a>
            <a href="#" class="nav-item {active_wallet}" title="Wallet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><rect x="1" y="4" width="22" height="6"/></svg>
            </a>
            <a href="#" class="nav-item {active_profile}" title="Profile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </a>
        </nav>

        <div class="sidebar-bottom">
            <a href="#" class="nav-item" title="Settings">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m6.08 0l4.24-4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m6.08 0l4.24 4.24"/></svg>
            </a>
        </div>
    </aside>

    <!-- Mobile Header -->
    <header class="mobile-header">
        <a href="#" class="mobile-header-brand">
            <div class="mobile-header-logo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 7V12C3 19.7 12 22 12 22S21 19.7 21 12V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 12L10 15L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span class="mobile-header-title">{page_title}</span>
        </a>
        <button class="mobile-menu-btn">☰</button>
    </header>
'''

MOBILE_NAV_TEMPLATE = '''
    <!-- Mobile Bottom Nav -->
    <nav class="mobile-nav">
        <button class="mobile-nav-item {active_discover}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 3"/></svg>
            <span>Discover</span>
        </button>
        <button class="mobile-nav-item {active_matches}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>Matches</span>
        </button>
        <button class="mobile-nav-item {active_chat}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Chat</span>
        </button>
        <button class="mobile-nav-item {active_wallet}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><rect x="1" y="4" width="22" height="6"/></svg>
            <span>Wallet</span>
        </button>
    </nav>
'''

# Define which pages have which active nav
ACTIVE_NAV = {
    'matches.html': {'page_title': 'Matches', 'active': 'matches'},
    'chat.html': {'page_title': 'Chat', 'active': 'chat'},
    'chat-list.html': {'page_title': 'Messages', 'active': 'chat'},
    'profile.html': {'page_title': 'Profile', 'active': 'profile'},
    'wallet.html': {'page_title': 'Wallet', 'active': 'wallet'},
}

# CSS variables to add
CSS_VARS = '''
        :root {
            --background: 240 6% 4%;
            --foreground: 0 0% 98%;
            --card: 240 6% 10%;
            --card-foreground: 0 0% 98%;
            --primary: 350 89% 60%;
            --secondary: 29 97% 60%;
            --muted: 240 4% 16%;
            --muted-foreground: 240 5% 64.9%;
            --border: 240 4% 16%;
        }

        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Outfit', sans-serif;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 80px;
            height: 100vh;
            background: hsl(var(--card)) / 50%;
            backdrop-filter: blur(40px);
            border-right: 1px solid hsl(var(--border));
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 40;
        }

        @media (max-width: 1024px) {
            .sidebar { display: none; }
        }

        .sidebar-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 80px;
            border-bottom: 1px solid hsl(var(--border));
        }

        .sidebar-logo-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 16px;
            background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.25);
        }

        .sidebar-logo-icon svg {
            width: 24px;
            height: 24px;
            color: white;
        }

        .sidebar-nav {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 24px 0;
        }

        .nav-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: transparent;
            border: none;
            color: hsl(var(--muted-foreground));
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            position: relative;
        }

        .nav-item:hover {
            background: hsl(var(--muted));
            color: hsl(var(--foreground));
        }

        .nav-item.active {
            color: hsl(var(--primary));
            background: hsl(var(--primary)) / 10%;
        }

        .nav-item.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 32px;
            background: hsl(var(--primary));
            border-radius: 0 4px 4px 0;
        }

        .nav-item svg {
            width: 20px;
            height: 20px;
        }

        .sidebar-bottom {
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid hsl(var(--border));
            padding: 12px 0;
        }

        /* ===== MOBILE HEADER ===== */
        .mobile-header {
            display: none;
        }

        @media (max-width: 1024px) {
            .mobile-header {
                display: flex;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 64px;
                background: hsl(var(--background)) / 80%;
                backdrop-filter: blur(40px);
                border-bottom: 1px solid hsl(var(--border));
                z-index: 40;
                align-items: center;
                justify-content: space-between;
                padding: 0 16px;
            }
        }

        .mobile-header-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: hsl(var(--foreground));
        }

        .mobile-header-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
        }

        .mobile-header-logo svg {
            width: 20px;
            height: 20px;
            color: white;
        }

        .mobile-header-title {
            font-family: 'Outfit', sans-serif;
            font-size: 18px;
            font-weight: 700;
        }

        .mobile-menu-btn {
            display: none;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: transparent;
            border: none;
            color: hsl(var(--foreground));
            cursor: pointer;
            font-size: 20px;
        }

        @media (max-width: 1024px) {
            .mobile-menu-btn { display: flex; }
        }

        /* ===== MAIN CONTENT ===== */
        main {
            margin-left: 80px;
            min-height: 100vh;
        }

        @media (max-width: 1024px) {
            main {
                margin-left: 0;
                padding-top: 64px;
                padding-bottom: 80px;
            }
        }

        /* ===== MOBILE NAV ===== */
        .mobile-nav {
            display: none;
        }

        @media (max-width: 1024px) {
            .mobile-nav {
                display: flex;
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 80px;
                background: hsl(var(--background)) / 80%;
                backdrop-filter: blur(40px);
                border-top: 1px solid hsl(var(--border));
                justify-content: space-around;
                align-items: center;
                z-index: 40;
            }
        }

        .mobile-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            background: none;
            border: none;
            color: hsl(var(--muted-foreground));
            cursor: pointer;
            text-decoration: none;
            font-size: 11px;
            font-weight: 500;
            transition: all 0.2s;
        }

        .mobile-nav-item:hover {
            color: hsl(var(--foreground));
        }

        .mobile-nav-item.active {
            color: hsl(var(--primary));
        }

        .mobile-nav-item svg {
            width: 24px;
            height: 24px;
        }
'''

if __name__ == '__main__':
    print("This is a reference script for updating sidebar layouts.")
    print("File locations: c:/Users/jasng/OneDrive/Desktop/spurtlinks_design/")
    print("\nFiles to update:")
    for filename in ACTIVE_NAV.keys():
        print(f"  - {filename}")
    print("\nManually insert the sidebar template before <main> tags")
    print("Add CSS variables and styles to <style> sections")
