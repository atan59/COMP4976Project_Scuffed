using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SportsThemesBackend.Data;
using SportsThemesBackend.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SportsThemesBackend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class TeamsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TeamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Teams
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Teams;

            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Teams/Details/5
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var team = await _context.Teams
                .FirstOrDefaultAsync(m => m.TeamName == id);

            if (team == null)
            {
                return NotFound();
            }

            return View(team);
        }

        // GET: Teams/Create
        public IActionResult Create()
        {
            ViewData["Coaches"] = new SelectList(_context.Coaches.Where(c => c.TeamName == null), "CoachId", "CoachName");
            ViewData["Themes"] = new SelectList(_context.Themes, "Id", "Name");
            return View();
        }

        // POST: Teams/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("TeamName, City, CoachId, ThemeId")] Team team)
        {
            if (ModelState.IsValid)
            {
                var coach = await _context.Coaches
                    .Where(c => c.CoachId == team.CoachId)
                    .FirstOrDefaultAsync();

                coach.TeamName = team.TeamName;

                _context.Add(team);
                _context.Update(coach);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(team);
        }

        // GET: Teams/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var team = await _context.Teams
                .FirstOrDefaultAsync(t => t.TeamName == id);

            if (team == null)
            {
                return NotFound();
            }

            ViewData["Coaches"] = new SelectList(_context.Coaches.Where(c => c.TeamName == null || c.CoachId == team.CoachId), "CoachId", "CoachName");
            ViewData["Themes"] = new SelectList(_context.Themes, "Id", "Name");

            return View(team);
        }

        // POST: Teams/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("TeamName, City, CoachId, ThemeId")] Team team)
        {
            if (id != team.TeamName)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var currentTeam = await _context.Teams
                        .Where(t => t.TeamName == id)
                        .FirstOrDefaultAsync();

                    if (currentTeam.CoachId != team.CoachId)
                    {
                        var oldCoach = await _context.Coaches
                        .Where(c => c.TeamName == id)
                        .FirstOrDefaultAsync();

                        oldCoach.TeamName = null;

                        _context.Update(oldCoach);
                    }

                    var newCoach = await _context.Coaches
                    .Where(c => c.CoachId == team.CoachId)
                    .FirstOrDefaultAsync();

                    newCoach.TeamName = team.TeamName;

                    _context.Update(team);
                    _context.Update(newCoach);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TeamExists(team.TeamName))
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
            return View(team);
        }

        // GET: Teams/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var team = await _context.Teams
                .FirstOrDefaultAsync(m => m.TeamName == id);

            if (team == null)
            {
                return NotFound();
            }

            return View(team);
        }

        // POST: Teams/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var team = await _context.Teams.FindAsync(id);
            var coach = await _context.Coaches
                    .Where(c => c.TeamName == id)
                    .FirstOrDefaultAsync();

            coach.TeamName = null;

            _context.Update(coach);
            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TeamExists(string id)
        {
            return _context.Teams.Any(e => e.TeamName == id);
        }
    }
}
