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
            var applicationDbContext = await _context.Teams
                .ToListAsync();

            var coachesNoTeam = await _context.Coaches
                .Where(c => c.TeamName == null)
                .ToListAsync();

            var coachIds = new List<string>();
            var themeIds = new List<Guid>();

            foreach (var team in applicationDbContext)
            {
                coachIds.Add(team.CoachId);
                themeIds.Add(team.ThemeId);
            }

            var coachNames = new Dictionary<string, string>();
            var themeNames = new Dictionary<Guid, string>();

            for (var i = 0; i < coachIds.Count(); i++)
            {
                var coach = await _context.Coaches
                    .Where(c => c.CoachId == coachIds[i])
                    .FirstOrDefaultAsync();

                var theme = await _context.Themes
                    .Where(c => c.Id == themeIds[i])
                    .FirstOrDefaultAsync();

                coachNames.Add(coachIds[i], coach.CoachName);

                if (!themeNames.ContainsKey(themeIds[i]))
                {
                    themeNames.Add(themeIds[i], theme.Name);
                }
            }

            ViewBag.CoachNames = coachNames;
            ViewBag.ThemeNames = themeNames;
            ViewBag.NumOfCoaches = coachesNoTeam.Count();

            return View(applicationDbContext);
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

            var coach = await _context.Coaches
                    .Where(c => c.CoachId == team.CoachId)
                    .FirstOrDefaultAsync();

            var theme = await _context.Themes
                .Where(c => c.Id == team.ThemeId)
                .FirstOrDefaultAsync();

            ViewBag.CoachName = coach.CoachName;
            ViewBag.ThemeName = theme.Name;

            return View(team);
        }

        // GET: Teams/Create
        public IActionResult Create()
        {
            var coaches = new SelectList(_context.Coaches.Where(c => c.TeamName == null), "CoachId", "CoachName");

            ViewBag.Coaches = coaches;
            ViewBag.CoachCount = coaches.Count();
            ViewBag.ShowWarning = false;
            ViewBag.ShowWarningMessage = $"";
            ViewBag.Themes = new SelectList(_context.Themes, "Id", "Name");
            return View();
        }

        // POST: Teams/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("TeamName, City, CoachId, ThemeId")] Team team)
        {
            var currentTeams = await _context.Teams
                .ToListAsync();

            foreach (var currentTeam in currentTeams)
            {
                if (currentTeam.TeamName == team.TeamName)
                {
                    ViewBag.ShowWarning = true;
                    ViewBag.ShowWarningMessage = $"This team name has already been used! Please enter a different team name.";

                    return View(team);
                }
            }

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

            ViewBag.ShowWarning = false;
            ViewBag.ShowWarningMessage = $"";

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

            ViewBag.Coaches = new SelectList(_context.Coaches.Where(c => c.TeamName == null || c.CoachId == team.CoachId), "CoachId", "CoachName");
            ViewBag.Themes = new SelectList(_context.Themes, "Id", "Name");
            ViewBag.ShowWarning = false;
            ViewBag.ShowWarningMessage = $"";

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

            var currentTeams = await _context.Teams
                .ToListAsync();

            foreach (var currentTeam in currentTeams)
            {
                if (currentTeam.TeamName == team.TeamName)
                {
                    ViewBag.ShowWarning = true;
                    ViewBag.ShowWarningMessage = $"This team name has already been used! Please enter a different team name.";

                    return View(team);
                }
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var coach = await _context.Coaches
                    .Where(c => c.CoachId == team.CoachId)
                    .FirstOrDefaultAsync();

                    var oldCoaches = await _context.Coaches
                        .Where(c => c.CoachId != team.CoachId && c.TeamName == team.TeamName)
                        .ToListAsync();

                    if (oldCoaches.Count() > 0)
                    {
                        foreach(var oldCoach in oldCoaches)
                        {
                            oldCoach.TeamName = null;
                            _context.Update(oldCoach);
                        }
                    }

                    coach.TeamName = team.TeamName;

                    _context.Update(team);
                    _context.Update(coach);
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

            var coach = await _context.Coaches
                    .Where(c => c.CoachId == team.CoachId)
                    .FirstOrDefaultAsync();

            var theme = await _context.Themes
                .Where(c => c.Id == team.ThemeId)
                .FirstOrDefaultAsync();

            ViewBag.CoachName = coach.CoachName;
            ViewBag.ThemeName = theme.Name;

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
