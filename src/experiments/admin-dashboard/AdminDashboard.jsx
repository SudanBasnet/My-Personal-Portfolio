import { useEffect, useMemo, useRef, useState } from "react";
import "./admin-dashboard.css";

const STORAGE_KEY = "portfolio-admin-demo-content";
const THEME_STORAGE_KEY = "portfolio-admin-demo-theme";
const SESSION_STORAGE_KEY = "portfolio-admin-demo-session";
const DEMO_USERNAME = "sdnbasnet5";
const DEMO_PASSWORD = "Sudan123!";

const SITE_THEMES = [
  {
    id: "classic",
    name: "Classic",
    route: "/",
    eyebrow: "Core portfolio",
    description: "The polished, content-first portfolio with light and dark modes.",
    detail: "Clear · Familiar · Accessible",
  },
  {
    id: "immersive",
    name: "Immersive",
    route: "/immersive",
    eyebrow: "Systems in Motion",
    description: "The spatial 3D experience built around systems and atmosphere.",
    detail: "3D · Cinematic · Interactive",
  },
  {
    id: "kinetic",
    name: "Kinetic",
    route: "/kinetic",
    eyebrow: "Kinetic Index",
    description: "The editorial experience with bold type and motion-led stories.",
    detail: "Editorial · Bold · Motion",
  },
];

const DEMO_CONTENT = [
  {
    id: "demo-1",
    title: "ClearQueue",
    category: "Project",
    status: "Published",
    summary: "A focused support queue for triage, ownership, and resolution.",
    updatedAt: "2026-09-04T10:30:00.000Z",
  },
  {
    id: "demo-2",
    title: "Enterprise support playbook",
    category: "Article",
    status: "Draft",
    summary: "Notes on building calmer and more observable support workflows.",
    updatedAt: "2026-09-02T05:15:00.000Z",
  },
  {
    id: "demo-3",
    title: "Finance Tracker",
    category: "Project",
    status: "Published",
    summary: "A simple workspace for understanding spending and cash flow.",
    updatedAt: "2026-08-29T01:45:00.000Z",
  },
  {
    id: "demo-4",
    title: "Portfolio refresh notes",
    category: "Note",
    status: "Archived",
    summary: "Ideas and follow-up tasks for the next portfolio iteration.",
    updatedAt: "2026-08-24T08:00:00.000Z",
  },
];

const EMPTY_FORM = {
  title: "",
  category: "Project",
  status: "Draft",
  summary: "",
};

const categoryTone = {
  Project: "mint",
  Article: "violet",
  Note: "amber",
};

const createId = () =>
  globalThis.crypto?.randomUUID?.() ?? `item-${Date.now()}`;

const loadContent = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEMO_CONTENT;

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : DEMO_CONTENT;
  } catch {
    return DEMO_CONTENT;
  }
};

const loadSelectedTheme = () => {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return SITE_THEMES.some((theme) => theme.id === saved) ? saved : "classic";
  } catch {
    return "classic";
  }
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const formatRelativeDate = (date) => {
  const elapsedDays = Math.floor(
    (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
  );

  if (elapsedDays <= 0) return "Today";
  if (elapsedDays === 1) return "Yesterday";
  if (elapsedDays < 7) return `${elapsedDays} days ago`;
  return formatDate(date);
};

const AdminDashboard = ({ onSignOut }) => {
  const [items, setItems] = useState(loadContent);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [activeSection, setActiveSection] = useState("overview");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [notice, setNotice] = useState("Demo data is saved in this browser.");
  const [selectedTheme, setSelectedTheme] = useState(loadSelectedTheme);
  const searchInputRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      return;
    }
  }, [items]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isEditorOpen) {
        setIsEditorOpen(false);
        setEditingId(null);
        setForm(EMPTY_FORM);
      }

      if (
        event.key === "/" &&
        !isEditorOpen &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditorOpen]);

  useEffect(() => {
    const sections = ["overview", "content-library", "theme-options"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-15% 0px -65%", threshold: [0, 0.25, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchingItems = items.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.status === activeFilter;
      const matchesQuery =
        !normalizedQuery ||
        [item.title, item.category, item.summary].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );

      return matchesFilter && matchesQuery;
    });

    return matchingItems.sort((first, second) => {
      if (sortBy === "title") return first.title.localeCompare(second.title);
      if (sortBy === "status") return first.status.localeCompare(second.status);
      return new Date(second.updatedAt) - new Date(first.updatedAt);
    });
  }, [activeFilter, items, query, sortBy]);

  const stats = useMemo(
    () => ({
      total: items.length,
      published: items.filter((item) => item.status === "Published").length,
      drafts: items.filter((item) => item.status === "Draft").length,
      categories: new Set(items.map((item) => item.category)).size,
    }),
    [items],
  );

  const dashboardInsights = useMemo(() => {
    const recentItems = [...items]
      .sort((first, second) => new Date(second.updatedAt) - new Date(first.updatedAt))
      .slice(0, 3);
    const publishedPercent = items.length
      ? Math.round((stats.published / items.length) * 100)
      : 0;
    const categoryCounts = ["Project", "Article", "Note"].map((category) => ({
      category,
      count: items.filter((item) => item.category === category).length,
    }));

    return { recentItems, publishedPercent, categoryCounts };
  }, [items, stats.published]);

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-AU", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(new Date()),
    [],
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIsEditorOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      status: item.status,
      summary: item.summary,
    });
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleaned = {
      title: form.title.trim(),
      category: form.category,
      status: form.status,
      summary: form.summary.trim(),
    };

    if (!cleaned.title || !cleaned.summary) return;

    if (editingId) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? { ...item, ...cleaned, updatedAt: new Date().toISOString() }
            : item,
        ),
      );
      setNotice(`“${cleaned.title}” was updated.`);
    } else {
      setItems((current) => [
        {
          id: createId(),
          ...cleaned,
          updatedAt: new Date().toISOString(),
        },
        ...current,
      ]);
      setNotice(`“${cleaned.title}” was created.`);
    }

    closeEditor();
  };

  const handleDelete = (item) => {
    const shouldDelete = window.confirm(
      `Delete “${item.title}”? This only removes the local demo record.`,
    );

    if (!shouldDelete) return;
    setItems((current) => current.filter((entry) => entry.id !== item.id));
    setNotice(`“${item.title}” was deleted.`);
  };

  const duplicateItem = (item) => {
    const copy = {
      ...item,
      id: createId(),
      title: `${item.title} copy`,
      status: "Draft",
      updatedAt: new Date().toISOString(),
    };

    setItems((current) => [copy, ...current]);
    setNotice(`A draft copy of “${item.title}” was created.`);
  };

  const resetDemo = () => {
    const shouldReset = window.confirm(
      "Reset all local changes and restore the starter records?",
    );

    if (!shouldReset) return;
    setItems(DEMO_CONTENT);
    setQuery("");
    setActiveFilter("All");
    setSortBy("recent");
    setNotice("Starter records were restored.");
  };

  const selectTheme = (theme) => {
    setSelectedTheme(theme.id);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme.id);
    } catch {
      return;
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`admin-app dashboard-theme-${selectedTheme}`}>
      <aside className="admin-sidebar" aria-label="Dashboard navigation">
        <div className="admin-brand" aria-label="Sudan Basnet admin">
          <span className="admin-brand-mark">SB</span>
          <span>
            <strong>Sudan.</strong>
            <small>Portfolio admin</small>
          </span>
        </div>

        <nav className="admin-nav">
          <button
            className={activeSection === "overview" ? "is-active" : ""}
            type="button"
            onClick={() => scrollToSection("overview")}
          >
            <span aria-hidden="true">⌂</span> Overview
          </button>
          <button
            className={activeSection === "content-library" ? "is-active" : ""}
            type="button"
            onClick={() => scrollToSection("content-library")}
          >
            <span aria-hidden="true">▦</span> Content
          </button>
          <button
            className={activeSection === "theme-options" ? "is-active" : ""}
            type="button"
            onClick={() => scrollToSection("theme-options")}
          >
            <span aria-hidden="true">◉</span> Themes
          </button>
          <button type="button" disabled>
            <span aria-hidden="true">⚙</span> Settings
            <small>Soon</small>
          </button>
        </nav>

        <div className="admin-sidebar-note">
          <span className="status-dot" />
          <div>
            <strong>Local demo mode</strong>
            <p>No database connected</p>
          </div>
        </div>
      </aside>

      <main className="admin-main" id="overview">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">Personal workspace</p>
            <h1>Good day, Sudan.</h1>
          </div>
          <div className="admin-topbar-actions">
            <span className="admin-date-chip">{todayLabel}</span>
            <label className="admin-search">
              <span aria-hidden="true">⌕</span>
              <span className="sr-only">Search content</span>
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search content"
              />
              <kbd>/</kbd>
            </label>
            <button className="admin-signout-button" type="button" onClick={onSignOut}>
              Sign out
            </button>
            <span className="admin-avatar" aria-label="Sudan Basnet">
              SB
            </span>
          </div>
        </header>

        <section className="admin-hero" aria-labelledby="dashboard-title">
          <div>
            <span className="admin-kicker"><i /> Workspace / Overview</span>
            <h2 id="dashboard-title">Shape what the world sees.</h2>
            <p>
              Your private studio for publishing work, refining stories, and keeping every portfolio experience current.
            </p>
          </div>
          <div className="admin-hero-actions">
            <button className="admin-primary-button" type="button" onClick={openCreate}>
              <span aria-hidden="true">＋</span> New content
            </button>
            <a className="admin-ghost-link" href="/" target="_blank" rel="noreferrer">
              View portfolio <span aria-hidden="true">↗</span>
            </a>
          </div>
          <span className="admin-hero-orb admin-hero-orb-one" aria-hidden="true" />
          <span className="admin-hero-orb admin-hero-orb-two" aria-hidden="true" />
        </section>

        <section className="admin-stats" aria-label="Content summary">
          <article>
            <span className="stat-icon stat-icon-mint" aria-hidden="true">▦</span>
            <div><strong>{stats.total}</strong><span>Total entries</span></div>
            <small><b>{filteredItems.length}</b> in current view</small>
          </article>
          <article>
            <span className="stat-icon stat-icon-violet" aria-hidden="true">✓</span>
            <div><strong>{stats.published}</strong><span>Published</span></div>
            <small><b>{dashboardInsights.publishedPercent}%</b> of your library</small>
          </article>
          <article>
            <span className="stat-icon stat-icon-amber" aria-hidden="true">✎</span>
            <div><strong>{stats.drafts}</strong><span>Drafts</span></div>
            <small><b>{stats.drafts ? "Needs review" : "All clear"}</b></small>
          </article>
          <article>
            <span className="stat-icon stat-icon-blue" aria-hidden="true">◫</span>
            <div><strong>{stats.categories}</strong><span>Categories</span></div>
            <small><b>Projects · Writing · Notes</b></small>
          </article>
        </section>

        <section className="admin-insights" aria-label="Workspace insights">
          <article className="admin-health-card">
            <div className="admin-insight-heading">
              <div>
                <p className="admin-eyebrow">Publishing health</p>
                <h2>Content readiness</h2>
              </div>
              <span className="admin-health-ring" style={{ "--health": `${dashboardInsights.publishedPercent * 3.6}deg` }}>
                <strong>{dashboardInsights.publishedPercent}%</strong>
              </span>
            </div>
            <p>Published entries are ready for your public portfolio. Drafts stay private in this local workspace.</p>
            <div className="admin-category-bars">
              {dashboardInsights.categoryCounts.map(({ category, count }) => (
                <div key={category}>
                  <span><b>{category}</b><small>{count}</small></span>
                  <i><em style={{ width: `${items.length ? (count / items.length) * 100 : 0}%` }} /></i>
                </div>
              ))}
            </div>
          </article>

          <article className="admin-activity-card">
            <div className="admin-insight-heading">
              <div>
                <p className="admin-eyebrow">Recent activity</p>
                <h2>Latest updates</h2>
              </div>
              <button type="button" onClick={() => scrollToSection("content-library")}>View all</button>
            </div>
            <div className="admin-activity-list">
              {dashboardInsights.recentItems.map((item) => (
                <button type="button" key={item.id} onClick={() => openEdit(item)}>
                  <span className={`activity-mark category-${categoryTone[item.category]}`}>{item.title.charAt(0)}</span>
                  <span><strong>{item.title}</strong><small>{item.category} · {item.status}</small></span>
                  <time dateTime={item.updatedAt}>{formatRelativeDate(item.updatedAt)}</time>
                </button>
              ))}
              {dashboardInsights.recentItems.length === 0 && (
                <p className="admin-activity-empty">Create your first entry to start the activity feed.</p>
              )}
            </div>
          </article>
        </section>

        <section className="admin-content-panel" id="content-library" aria-labelledby="content-heading">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">Content library</p>
              <h2 id="content-heading">Manage content</h2>
            </div>
            <button className="admin-reset-button" type="button" onClick={resetDemo}>
              Reset demo
            </button>
          </div>

          <div className="admin-toolbar">
            <div className="admin-filters" aria-label="Filter by status">
              {["All", "Published", "Draft", "Archived"].map((filter) => (
                <button
                  className={activeFilter === filter ? "is-active" : ""}
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                  <span>
                    {filter === "All"
                      ? items.length
                      : items.filter((item) => item.status === filter).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="admin-toolbar-meta">
              <p role="status">{notice}</p>
              <label>
                <span className="sr-only">Sort content</span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="recent">Recently updated</option>
                  <option value="title">Title A–Z</option>
                  <option value="status">Status</option>
                </select>
              </label>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Content</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                      <span>{item.summary}</span>
                    </td>
                    <td>
                      <span className={`category-tag category-${categoryTone[item.category]}`}>
                        {item.category}
                      </span>
                    </td>
                    <td>
                      <span className={`status-tag status-${item.status.toLowerCase()}`}>
                        <i /> {item.status}
                      </span>
                    </td>
                    <td><time dateTime={item.updatedAt}>{formatDate(item.updatedAt)}</time></td>
                    <td>
                      <div className="admin-row-actions">
                        <button type="button" onClick={() => openEdit(item)} aria-label={`Edit ${item.title}`}>
                          Edit
                        </button>
                        <button type="button" onClick={() => duplicateItem(item)} aria-label={`Duplicate ${item.title}`}>
                          Duplicate
                        </button>
                        <button className="is-danger" type="button" onClick={() => handleDelete(item)} aria-label={`Delete ${item.title}`}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="admin-empty-state">
                <span aria-hidden="true">⌕</span>
                <h3>No content found</h3>
                <p>Try another search or status filter.</p>
                <button type="button" onClick={() => { setQuery(""); setActiveFilter("All"); }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section
          className="admin-theme-panel"
          id="theme-options"
          aria-labelledby="theme-options-heading"
        >
          <div className="admin-theme-heading">
            <div>
              <p className="admin-eyebrow">Portfolio experiences</p>
              <h2 id="theme-options-heading">Website themes</h2>
              <p>Choose the dashboard appearance or open any portfolio experience.</p>
            </div>
            <span>3 themes available</span>
          </div>

          <div className="admin-theme-grid">
            {SITE_THEMES.map((theme) => {
              const isSelected = selectedTheme === theme.id;

              return (
                <article
                  className={`admin-theme-card theme-${theme.id}${isSelected ? " is-selected" : ""}`}
                  key={theme.id}
                >
                  <div className="admin-theme-preview" aria-hidden="true">
                    <span className="theme-preview-nav" />
                    <span className="theme-preview-title">{theme.name}</span>
                    <span className="theme-preview-line theme-preview-line-long" />
                    <span className="theme-preview-line" />
                    <span className="theme-preview-accent" />
                  </div>
                  <div className="admin-theme-copy">
                    <div className="admin-theme-name">
                      <div>
                        <span>{theme.eyebrow}</span>
                        <h3>{theme.name}</h3>
                      </div>
                      {isSelected && <strong>Active</strong>}
                    </div>
                    <p>{theme.description}</p>
                    <small>{theme.detail}</small>
                  </div>
                  <div className="admin-theme-actions">
                    <button
                      className={isSelected ? "is-selected" : ""}
                      type="button"
                      onClick={() => selectTheme(theme)}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? "Current theme" : "Apply theme"}
                    </button>
                    <a href={theme.route} target="_blank" rel="noreferrer">
                      Open preview <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="admin-theme-note">
            <span aria-hidden="true">ⓘ</span>
            Your dashboard theme is active now and saved in this browser. It does not change the public portfolio theme.
          </p>
        </section>
      </main>

      {isEditorOpen && (
        <div className="admin-editor-backdrop" role="presentation" onMouseDown={closeEditor}>
          <section
            className="admin-editor"
            role="dialog"
            aria-modal="true"
            aria-labelledby="editor-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="admin-editor-heading">
              <div>
                <p className="admin-eyebrow">{editingId ? "Update record" : "Create record"}</p>
                <h2 id="editor-title">{editingId ? "Edit content" : "New content"}</h2>
              </div>
              <button type="button" onClick={closeEditor} aria-label="Close editor">×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Title
                <input
                  autoFocus
                  required
                  maxLength="80"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Project or article title"
                />
              </label>

              <div className="admin-form-grid">
                <label>
                  Type
                  <select
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  >
                    <option>Project</option>
                    <option>Article</option>
                    <option>Note</option>
                  </select>
                </label>
                <label>
                  Status
                  <select
                    value={form.status}
                    onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                  >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </select>
                </label>
              </div>

              <label>
                Summary
                <textarea
                  required
                  maxLength="220"
                  rows="6"
                  value={form.summary}
                  onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
                  placeholder="A short description of this content"
                />
                <small>{form.summary.length}/220</small>
              </label>

              <div className="admin-editor-actions">
                <button className="admin-secondary-button" type="button" onClick={closeEditor}>Cancel</button>
                <button className="admin-primary-button" type="submit">
                  {editingId ? "Save changes" : "Create content"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

const loadDemoSession = () => {
  try {
    return window.sessionStorage.getItem(SESSION_STORAGE_KEY) === "active";
  } catch {
    return false;
  }
};

const DashboardLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginState, setLoginState] = useState("idle");
  const loginTimerRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => () => window.clearTimeout(loginTimerRef.current), []);

  const resetFeedback = () => {
    setError("");
    setLoginState("idle");
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (username.trim() !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      setError("Those details do not match the demo access shown below.");
      setLoginState("error");
      return;
    }

    setError("");
    setLoginState("checking");
    loginTimerRef.current = window.setTimeout(() => {
      setLoginState("success");
      loginTimerRef.current = window.setTimeout(onLogin, 320);
    }, 420);
  };

  const fillDemoCredentials = () => {
    setUsername(DEMO_USERNAME);
    setPassword(DEMO_PASSWORD);
    resetFeedback();
    window.requestAnimationFrame(() => submitButtonRef.current?.focus());
  };

  return (
    <main className="admin-login-page">
      <span className="admin-login-glow admin-login-glow-one" aria-hidden="true" />
      <span className="admin-login-glow admin-login-glow-two" aria-hidden="true" />

      <div className="admin-login-shell">
        <section className="admin-login-story" aria-labelledby="admin-login-title">
          <a className="admin-login-brand" href="/" aria-label="Sudan Basnet portfolio home">
            <span className="admin-login-brand-mark">SB</span>
            <span>
              <strong>Sudan.</strong>
              <small>Portfolio admin</small>
            </span>
          </a>

          <div className="admin-login-intro">
            <span className="admin-login-kicker"><i /> Private workspace</span>
            <h1 id="admin-login-title">Your work,<br />under control.</h1>
            <p>
              Sign in to shape portfolio stories, manage your project library,
              and preview each experience from one focused workspace.
            </p>
          </div>

          <div className="admin-login-preview" aria-hidden="true">
            <span className="admin-login-preview-bar" />
            <div>
              <span />
              <span />
              <span />
            </div>
            <i />
          </div>

          <p className="admin-login-footnote">
            <span aria-hidden="true">✦</span> Local demo · No database connected
          </p>
        </section>

        <section className="admin-login-panel" aria-labelledby="sign-in-heading">
          <div className="admin-login-card">
            <div className="admin-login-card-heading">
              <span className="admin-login-lock" aria-hidden="true">↗</span>
              <p className="admin-eyebrow">Welcome back</p>
              <h2 id="sign-in-heading">Sign in to your dashboard</h2>
              <p>Enter the demo details to continue to your private workspace.</p>
            </div>

            <form
              className={`admin-login-form admin-login-form-${loginState}`}
              onSubmit={handleLogin}
              aria-busy={loginState === "checking"}
            >
              <label>
                <span>Username</span>
                <input
                  autoFocus
                  autoComplete="username"
                  type="text"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    resetFeedback();
                  }}
                  placeholder="Enter your username"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "admin-login-feedback" : undefined}
                  disabled={loginState === "checking" || loginState === "success"}
                  required
                />
              </label>

              <label>
                <span>Password</span>
                <div className="admin-password-field">
                  <input
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      resetFeedback();
                    }}
                    placeholder="Enter your password"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "admin-login-feedback" : undefined}
                    disabled={loginState === "checking" || loginState === "success"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={loginState === "checking" || loginState === "success"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <p
                id="admin-login-feedback"
                className="admin-login-error"
                role={error ? "alert" : "status"}
                aria-live="polite"
              >
                {error || (loginState === "checking" ? "Checking local demo access…" : "")}
              </p>

              <button
                ref={submitButtonRef}
                className="admin-login-submit"
                type="submit"
                disabled={loginState === "checking" || loginState === "success"}
              >
                <span className="admin-login-submit-label">
                  {loginState === "checking" && "Checking access…"}
                  {loginState === "success" && "Access confirmed"}
                  {(loginState === "idle" || loginState === "error") && "Enter workspace"}
                </span>
                <span className="admin-login-submit-icon" aria-hidden="true">
                  {loginState === "checking" ? "···" : loginState === "success" ? "✓" : "→"}
                </span>
              </button>
            </form>

            <div className="admin-demo-access">
              <div>
                <span className="admin-demo-dot" aria-hidden="true" />
                <span>
                  <strong>Demo access</strong>
                  <small>Use these local preview credentials</small>
                </span>
                <button type="button" onClick={fillDemoCredentials}>
                  Fill details
                </button>
              </div>
              <dl>
                <div><dt>Username</dt><dd>{DEMO_USERNAME}</dd></div>
                <div><dt>Password</dt><dd>{DEMO_PASSWORD}</dd></div>
              </dl>
            </div>

            <p className="admin-login-disclaimer">
              This is a front-end demo gate. It is not connected to an authentication service yet.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

const AdminDashboardEntry = () => {
  const [isSignedIn, setIsSignedIn] = useState(loadDemoSession);

  const handleLogin = () => {
    try {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, "active");
    } catch {
      // The demo still works for this render when storage is unavailable.
    }

    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    try {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Signing out still updates the current render when storage is unavailable.
    }

    setIsSignedIn(false);
  };

  return isSignedIn ? (
    <AdminDashboard onSignOut={handleSignOut} />
  ) : (
    <DashboardLogin onLogin={handleLogin} />
  );
};

export default AdminDashboardEntry;
