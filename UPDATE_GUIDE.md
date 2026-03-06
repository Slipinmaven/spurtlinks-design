# SpurtLinks Design Files - Sidebar Layout Update Summary

## Status
- ✅ verify.html - Updated with exact React design
- ✅ dashboard.html - Updated with sidebar layout
- ✅ discover.html - Updated with sidebar layout  
- ⏳ 7 More files to update: matches, chat, chat-list, profile, settings, wallet, admin

## HTML Structure Template (Copy to all user pages)

```html
<!-- SIDEBAR - Fixed left on desktop, hidden on mobile -->
<aside class="sidebar">
    <a href="#" class="sidebar-logo">
        <div class="sidebar-logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7V12C3 19.7 12 22 12 22S21 19.7 21 12V7L12 2Z" stroke="currentColor" stroke-width="2"/>
                <path d="M7 12L10 15L17 9" stroke="currentColor" stroke-width="2"/>
            </svg>
        </div>
    </a>
    
    <nav class="sidebar-nav">
        <a href="#discover" class="nav-item" title="Discover"><!-- icon --></a>
        <a href="#matches" class="nav-item" title="Matches"><!-- icon --></a>
        <a href="#chat" class="nav-item" title="Chat"><!-- icon --></a>
        <a href="#wallet" class="nav-item" title="Wallet"><!-- icon --></a>
        <a href="#profile" class="nav-item" title="Profile"><!-- icon --></a>
    </nav>
    
    <div class="sidebar-bottom">
        <a href="#settings" class="nav-item" title="Settings"><!-- icon --></a>
    </div>
</aside>

<!-- MOBILE HEADER - Fixed top on mobile, hidden on desktop -->
<header class="mobile-header">
    <a href="#" class="mobile-header-brand">
        <div class="mobile-header-logo"><!-- logo icon --></div>
        <span class="mobile-header-title">SpurtLinks</span>
    </a>
    <button class="mobile-menu-btn">☰</button>
</header>

<!-- MAIN CONTENT -->
<main>
    <div class="page-container">
        <!-- Page content here -->
    </div>
</main>

<!-- MOBILE BOTTOM NAV - Fixed bottom on mobile, hidden on desktop -->
<nav class="mobile-nav">
    <button class="mobile-nav-item active"><!-- icon + label --></button>
    <!-- other nav items -->
</nav>
```

## CSS Variables (Add to :root)

```css
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
```

## Font Families

```css
body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', sans-serif;
}
```

## CSS Base Styles (Copy from dashboard.html or discover.html)

All following classes with their complete styling:
- `.sidebar` and sub-classes (`.sidebar-logo`, `.sidebar-nav`, `.nav-item`, `.nav-item.active`, `.nav-item::before`, `.sidebar-bottom`)
- `.mobile-header` and sub-classes (`.mobile-header-brand`, `.mobile-header-logo`, `.mobile-header-title`, `.mobile-menu-btn`)
- `.mobile-nav` and `.mobile-nav-item` with active state

Media queries:
- Hide sidebar and mobile-header at `@media (max-width: 1024px)`
- Show sidebar at desktop with `lg:flex`
- Adjust main content margins: desktop (`margin-left: 80px`), mobile (`margin-left: 0; padding-top: 64px; padding-bottom: 80px`)

## Navigation Active States by Page

| Page | Active Nav Item | Active Mobile Item |
|------|---|---|
| dashboard.html | Discover | Discover |
| discover.html | Discover | Discover |
| matches.html | Matches | Matches |
| chat.html | Chat | Chat |
| chat-list.html | Chat | Chat |
| profile.html | Profile | Profile |
| settings.html | Settings (bottom) | Profile |
| wallet.html | Wallet | Wallet |
| admin.html | Profile | Profile |

## Auth Pages (No Sidebar)

- landing.html - Keep as-is (no sidebar)
- login.html - Keep as-is (no sidebar)
- signup.html - Keep as-is (no sidebar)
- forgot-password.html - Keep as-is (no sidebar)
- profile-completion.html - Keep as-is (no sidebar)
- verify.html - Already updated

## Files Needing Update

1. **matches.html** - Add sidebar template, keep match tabs/grid
2. **chat.html** - Add sidebar template, keep chat interface
3. **chat-list.html** - Add sidebar template, keep conversation list
4. **profile.html** - Add sidebar template, keep profile content
5. **settings.html** - Add sidebar template, keep settings form
6. **wallet.html** - Replace navbar with sidebar template
7. **admin.html** - Add sidebar template, keep admin dashboard

## Removal Instructions

- Remove any `.navbar` or custom header styles
- Remove all theme toggle buttons (`<button>` with theme/sun/moon icons)
- Remove `.theme-transition` or theme-related CSS
- Replace all hardcoded color hex values with HSL `:root` variables

## Target Outcome

All user-facing pages (except auth + landing) have:
- ✅ Desktop sidebar with 5 navigation items
- ✅ Mobile header with logo + page title
- ✅ Mobile bottom navigation (80px)
- ✅ Exact SpurtLinks color scheme (HSL-based)
- ✅ 'Plus Jakarta Sans' body font, 'Outfit' headings
- ✅ No theme toggle buttons
- ✅ Proper responsive layout with media queries
