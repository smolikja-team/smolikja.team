# smolikja team portfolio

A modern, performant portfolio website built with Next.js 15, featuring scroll-snap functionality and adaptive video backgrounds.

## 🚀 Quick Start

```bash
# Development
npm run dev

# Production build
npm run build && npm start

# Static export for deployment
npm run export
```

## 📁 Project Structure

```text
portfolio-web/
├── src/                    # Source code
│   ├── app/               # Next.js App Router
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities and configurations
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── docs/                # Project documentation
├── deploy/              # Deployment configurations
└── config files         # Configuration files
```

## 🎯 Features

- **Performance Optimized**: Lazy loading, connection-aware video loading
- **Responsive Design**: Mobile-first approach with fluid scaling
- **Scroll Snap**: Smooth section navigation on desktop
- **Video Background**: Adaptive resolution based on connection speed
- **SEO Optimized**: Comprehensive metadata and structured data
- **Production Ready**: Deployment scripts and configurations included

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.2
- **Styling**: Tailwind CSS + Custom CSS
- **TypeScript**: Full type safety
- **Deployment**: Static export + Nginx configurations

## 📚 Documentation

See the `docs/` directory for:

- Deployment guides
- Performance optimizations
- SEO implementation
- Responsive design details

## 🚀 Deployment

Choose from two deployment options:

1. **Static Deployment** (Recommended)

   ```bash
   npm run export
   ./deploy/deploy-static.sh
   ```

2. **Server-Side Rendering**

   ```bash
   ./deploy/deploy-proxy.sh
   ```

Detailed deployment instructions are available in `docs/deployment-guide.md`.

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint:fix

# Bundle analysis
npm run build:analyze
```

## 📊 Performance

- **First Load JS**: ~113kB (optimized)
- **Lighthouse Score**: 95+ across all metrics
- **Load Time**: < 1 second
- **Mobile Optimized**: Responsive video loading

---

Built by **smolikja team** - Professional mobile app development
