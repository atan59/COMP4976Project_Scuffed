using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SportsThemesBackend.Data;
using SportsThemesBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsThemesBackend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ThemesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ThemesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Themes
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Themes;

            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Themes/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var theme = await _context.Themes
                .FirstOrDefaultAsync(m => m.Id == id);

            if (theme == null)
            {
                return NotFound();
            }

            ViewBag.LogoURL = theme.Logo;

            return View(theme);
        }

        // GET: Themes/Create
        public IActionResult Create()
        {
            var fonts = new SelectList(new List<SelectListItem>
            {
                new SelectListItem { Text = "Arial", Value = "Arial"},
                new SelectListItem { Text = "Bookman", Value = "Bookman"},
                new SelectListItem { Text = "Brush Script MT", Value = "Brush Script MT"},
                new SelectListItem { Text = "Brushstroke", Value = "Brushstroke"},
                new SelectListItem { Text = "Calibri", Value = "Calibri"},
                new SelectListItem { Text = "Comic Sans MS", Value = "Comic Sans MS"},
                new SelectListItem { Text = "Courier", Value = "Courier"},
                new SelectListItem { Text = "Helvetica", Value = "Helvetica"},
                new SelectListItem { Text = "Impact", Value = "Impact"},
                new SelectListItem { Text = "Ink Free", Value = "Ink Free"},
                new SelectListItem { Text = "Lucida Console", Value = "Lucida Console"},
                new SelectListItem { Text = "Lucida Handwriting", Value = "Lucida Handwriting"},
                new SelectListItem { Text = "Papyrus", Value = "Papyrus"},
                new SelectListItem { Text = "Times New Roman", Value = "Times New Roman"},
                new SelectListItem { Text = "Verdana", Value = "Verdana"},
            }, "Value", "Text");

            ViewBag.Fonts = fonts;

            return View();
        }

        // POST: Themes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id, Name, BodyColour, ListBackgroundColour, TextColour, ButtonTextColour, ButtonBackgroundColour, LinkTextColour, LinkOpacity, Font, HeaderFontSize, Logo, TextFontSize")] Theme theme)
        {
            if (ModelState.IsValid)
            {
                _context.Add(theme);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            return View(theme);
        }

        // GET: Themes/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var theme = await _context.Themes.FindAsync(id);

            if (theme == null)
            {
                return NotFound();
            }

            var fonts = new SelectList(new List<SelectListItem>
            {
                new SelectListItem { Text = "Arial", Value = "Arial"},
                new SelectListItem { Text = "Bookman", Value = "Bookman"},
                new SelectListItem { Text = "Brush Script MT", Value = "Brush Script MT"},
                new SelectListItem { Text = "Brushstroke", Value = "Brushstroke"},
                new SelectListItem { Text = "Calibri", Value = "Calibri"},
                new SelectListItem { Text = "Comic Sans MS", Value = "Comic Sans MS"},
                new SelectListItem { Text = "Courier", Value = "Courier"},
                new SelectListItem { Text = "Helvetica", Value = "Helvetica"},
                new SelectListItem { Text = "Impact", Value = "Impact"},
                new SelectListItem { Text = "Ink Free", Value = "Ink Free"},
                new SelectListItem { Text = "Lucida Console", Value = "Lucida Console"},
                new SelectListItem { Text = "Lucida Handwriting", Value = "Lucida Handwriting"},
                new SelectListItem { Text = "Papyrus", Value = "Papyrus"},
                new SelectListItem { Text = "Times New Roman", Value = "Times New Roman"},
                new SelectListItem { Text = "Verdana", Value = "Verdana"},
            }, "Value", "Text");

            ViewBag.Fonts = fonts;

            return View(theme);
        }

        // POST: Themes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id, Name, BodyColour, ListBackgroundColour, TextColour, ButtonTextColour, ButtonBackgroundColour, LinkTextColour, LinkOpacity, Font, HeaderFontSize, Logo, TextFontSize")] Theme theme)
        {
            if (id != theme.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(theme);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ThemeExists(theme.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(theme);
        }

        // GET: Themes/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var theme = await _context.Themes
                .FirstOrDefaultAsync(m => m.Id == id);
            if (theme == null)
            {
                return NotFound();
            }

            ViewBag.LogoURL = theme.Logo;

            return View(theme);
        }

        // POST: Themes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var theme = await _context.Themes.FindAsync(id);
            _context.Themes.Remove(theme);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ThemeExists(Guid id)
        {
            return _context.Themes.Any(e => e.Id == id);
        }
    }
}
