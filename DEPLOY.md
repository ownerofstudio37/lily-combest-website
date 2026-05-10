# Lilly Combest Website — Deployment & Launch Guide

Welcome! This document walks you through final setup steps, DNS configuration, analytics, and launch day procedures.

---

## 📋 Pre-Launch Checklist

### Content & Branding
- [ ] Update bio/about page with Lilly's full background and credentials
- [ ] Add professional photo(s) to `/public` and update hero images in `locales/en.json` and `locales/es.json`
- [ ] Review all copy for tone, typos, and accuracy
- [ ] Verify all contact information (email, phone, address) is correct
- [ ] Add testimonials or case studies (optional — can add later)

### Integrations

- [ ] **Consultation Requests**: Confirm contact flow is active
   - Verify `/contact` form submits successfully
   - Confirm email notifications are received at `lilly@lillycombest.com`
   - Ensure CTA buttons route to `/contact#consultation-request`

- [ ] **Email**: Verify Resend domain
  - In Resend dashboard, add DNS records to verify `hello.lillycombest.com` (or your domain)
  - Once verified, contact form emails will send from your domain
  - Test the contact form and confirm receipt at `lilly@lillycombest.com`
- [ ] **Analytics** (optional): Set up Google Analytics or Plausible
  - Add `NEXT_PUBLIC_GA_ID` to Netlify env vars if using Google Analytics
  - Or integrate Plausible dashboard link

### Technical Checks
- [ ] Run local build: `npm run build` — ensure no errors
- [ ] Test contact form submission (on deployed site once DNS is set)
- [ ] Test consult CTA buttons (click routes to consultation request form)
- [ ] Test language toggle (EN/ES switch persists)
- [ ] Check responsive layout on mobile (iPhone, Android)
- [ ] Verify images load fast (Cloudinary transformations working)
- [ ] Check console for JavaScript errors (F12 > Console tab)

---

## 🌐 DNS & Domain Setup

### Point Domain to Netlify
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update DNS records to point to Netlify:
   - **A Record**: `lilycombest.com` → `75.3.110.61` (or current Netlify IP)
   - **CNAME**: `www` → `lilycombest.netlify.app`
3. Wait 15-60 minutes for DNS to propagate (check with [dnschecker.org](https://dnschecker.org))

### Setup Netlify Custom Domain
1. Netlify dashboard > Site settings > Domain management > Add custom domain
2. Enter `lilycombest.com`
3. Netlify will auto-generate an SSL certificate (HTTPS enabled)
4. Verify domain propagation in Netlify

### Resend Email Domain Verification
1. Resend dashboard > Domains > your domain (`hello.lillycombest.com`)
2. Add the DNS records provided by Resend to your domain registrar
3. Wait for verification (typically 5-15 minutes)
4. Once verified, emails from the contact form will send successfully

---

## 📊 Analytics Setup (Optional but Recommended)

### Google Analytics
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create new property for `lilycombest.com`
3. Copy Google Analytics Measurement ID (starts with `G-`)
4. Add to Netlify env var: `NEXT_PUBLIC_GA_ID`
5. Redeploy site

### Plausible (Privacy-Friendly Alternative)
1. Go to [plausible.io](https://plausible.io) and create account
2. Add `lilycombest.com` as a new site
3. Copy the Plausible embed code or use their Next.js integration
4. Add to your codebase if desired

---

## 📧 Contact Form & Email

### Resend Email Forwarding
- Contact form submissions → forwarded to `lilly@lillycombest.com`
- Replies are sent from `hello@hello.lillycombest.com` (or your domain once verified)
- To reply directly from your email: click "Reply" and Resend will use `reply_to` header to route responses

### Testing Contact Form
1. Visit deployed site > Contact page
2. Fill out form with test data
3. Click Send
4. Check `lilly@lillycombest.com` inbox for email within 30 seconds
5. If not received:
   - Check Resend dashboard > Logs for any errors
   - Verify domain is verified in Resend (see above)
   - Check spam/junk folder

---

## 🚀 Launch Day

### Final Checks (1 hour before launch)
1. [ ] Site loads without errors
2. [ ] All links work (navigation, CTAs, footer)
3. [ ] Contact form sends successfully
4. [ ] Consultation CTA routes to contact request form
5. [ ] Mobile responsive (test on phone)
6. [ ] Blog posts display correctly

### Announce Launch
1. [ ] Update social media profiles with link to site
2. [ ] Email friends/family/network with launch announcement
3. [ ] Consider submitting to local business directories (Google Business Profile, Yelp, local chambers)
4. [ ] Add to email signature if sending emails that day

### Monitor First 24 Hours
- Check Netlify deploy logs for any runtime errors
- Monitor Resend logs for contact form issues
- Check analytics for first visitors
- Respond quickly to any contact form submissions

---

## 🔄 Post-Launch: Search Visibility

### Submit to Search Engines
1. **Google Search Console**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add property for `lilycombest.com`
   - Submit sitemap: `lilycombest.com/sitemap.xml`
   - Request indexing of homepage
   
2. **Bing Webmaster Tools**
   - Go to [bing.com/webmasters](https://www.bing.com/webmasters)
   - Add site and submit sitemap

### Monitor Search Performance
- Check Search Console after 1-2 weeks for impressions and clicks
- Look for any indexing issues or errors
- Update meta descriptions or keywords if needed

---

## 🔙 Rollback Plan (If Issues Occur)

### Revert to Previous Deployment
If something breaks after launch:
1. Netlify dashboard > Deploys
2. Find the last working deployment
3. Click "Restore" to roll back instantly

### Git Rollback (If Code Issue)
```bash
git log --oneline  # Find the commit before the issue
git revert <commit-hash>  # Creates a new commit that undoes changes
git push  # Netlify auto-deploys
```

---

## 📝 Content Updates

### Adding Blog Posts
1. Create new `.md` file in `content/blog/` (e.g., `my-post.md`)
2. Add YAML frontmatter:
   ```yaml
   ---
   title: "Post Title"
   slug: "post-slug"
   date: "2025-01-15"
   author: "Lilly Combest"
   excerpt: "Short summary..."
   featured_image: "https://cloudinary.com/image.jpg"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write markdown content below `---`
4. Commit and push to GitHub
5. Netlify auto-deploys; blog post appears on `/blog`

### Updating Copy
1. Edit text in components (e.g., `app/components/Hero.tsx`)
2. For translations: update `locales/en.json` and `locales/es.json`
3. Commit and push
4. Site redeploys automatically

---

## 🆘 Troubleshooting

### Contact Form Not Sending
- [ ] Resend domain verified in dashboard?
- [ ] `RESEND_API_KEY` set in Netlify env vars?
- [ ] Check Resend Logs tab for errors
- [ ] Try submitting form again (may be rate-limited)


### Consultation CTA Not Working

- [ ] CTA links point to `/contact#consultation-request`?
- [ ] Contact page loads and shows the request form?
- [ ] JavaScript errors in browser console?

### Images Not Loading
- [ ] Cloudinary domain added to `next.config.js` remotePatterns? ✅ (Already done)
- [ ] Image URL valid and public on Cloudinary?
- [ ] Check browser Network tab (F12) for 404 errors

### Site Slow
- [ ] Run Lighthouse audit (F12 > Lighthouse)
- [ ] Check image sizes (should be under 100KB for thumbnails)
- [ ] Check Netlify deploy logs for build warnings
- [ ] Clear browser cache (Cmd+Shift+Delete)

---

## 📞 Support & Next Steps

### Common Tasks
- **Add analytics**: See Analytics Setup section above
- **Change colors**: Edit `app/globals.css` CSS variables
- **Update logo**: Visit `/styleguide` and select new variant (or add new SVG to `public/`)
- **Add services**: Update `locales/en.json` services array and create dedicated service pages

### Get Help
- Netlify Support: [netlify.com/support](https://netlify.com/support)
- Resend Support: [resend.com/docs](https://resend.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

## 🎉 Congratulations!

Your site is live and ready to welcome clients. Keep adding content, monitor analytics, and iterate based on visitor feedback.

**Questions?** Check the README.md or reach out to your developer.
