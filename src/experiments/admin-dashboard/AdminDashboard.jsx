import { useEffect, useMemo, useState } from "react";
import "./admin-dashboard.css";

const STORAGE_KEY = "portfolio-admin-demo-content";
const THEME_STORAGE_KEY = "portfolio-admin-demo-theme";

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

const AdminDashboard = () => {
  const [items, setItems] = useState(loadContent);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [notice, setNotice] = useState("Demo data is saved in this browser.");
  const [selectedTheme, setSelectedTheme] = useState(loadSelectedTheme);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      return;
    }
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.status === activeFilter;
      const matchesQuery =
        !normalizedQuery ||
        [item.title, item.category, item.summary].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, items, query]);

  const stats = useMemo(
    () => ({
      total: items.length,
      published: items.filter((item) => item.status === "Published").length,
      drafts: items.filter((item) => item.status === "Draft").length,
      categories: new Set(items.map((item) => item.category)).size,
    }),
    [items],
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

  const resetDemo = () => {
    const shouldReset = window.confirm(
      "Reset all local changes and restore the starter records?",
    );

    if (!shouldReset) return;
    setItems(DEMO_CONTENT);
    setQuery("");
    setActiveFilter("All");
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
          <button className="is-active" type="button">
            <span aria-hidden="true">⌂</span> Overview
          </button>
          <button type="button" onClick={() => setActiveFilter("All")}>
            <span aria-hidden="true">▦</span> Content
          </button>
          <button type="button" onClick={() => scrollToSection("theme-options")}>
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

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">Personal workspace</p>
            <h1>Good day, Sudan.</h1>
          </div>
          <div className="admin-topbar-actions">
            <label className="admin-search">
              <span aria-hidden="true">⌕</span>
              <span className="sr-only">Search content</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search content"
              />
            </label>
            <span className="admin-avatar" aria-label="Sudan Basnet">
              SB
            </span>
          </div>
        </header>

        <section className="admin-hero" aria-labelledby="dashboard-title">
          <div>
            <span className="admin-kicker">Workspace / Overview</span>
            <h2 id="dashboard-title">Shape what the world sees.</h2>
            <p>
              Create, review, and refine portfolio content from one calm place.
            </p>
          </div>
          <button className="admin-primary-button" type="button" onClick={openCreate}>
            <span aria-hidden="true">＋</span> New content
          </button>
          <span className="admin-hero-orb admin-hero-orb-one" aria-hidden="true" />
          <span className="admin-hero-orb admin-hero-orb-two" aria-hidden="true" />
        </section>

        <section className="admin-stats" aria-label="Content summary">
          <article>
            <span className="stat-icon stat-icon-mint" aria-hidden="true">▦</span>
            <div><strong>{stats.total}</strong><span>Total entries</span></div>
            <small>Local records</small>
          </article>
          <article>
            <span className="stat-icon stat-icon-violet" aria-hidden="true">✓</span>
            <div><strong>{stats.published}</strong><span>Published</span></div>
            <small>Visible status</small>
          </article>
          <article>
            <span className="stat-icon stat-icon-amber" aria-hidden="true">✎</span>
            <div><strong>{stats.drafts}</strong><span>Drafts</span></div>
            <small>In progress</small>
          </article>
          <article>
            <span className="stat-icon stat-icon-blue" aria-hidden="true">◫</span>
            <div><strong>{stats.categories}</strong><span>Categories</span></div>
            <small>Content types</small>
          </article>
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

        <section className="admin-content-panel" aria-labelledby="content-heading">
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
                </button>
              ))}
            </div>
            <p role="status">{notice}</p>
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

export default AdminDashboard;
