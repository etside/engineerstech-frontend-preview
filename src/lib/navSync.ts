import { adminApi } from "@/lib/api";
import { defaultNavigation, serializeNavigation } from "@/data/navigation";

export interface NavSubItemData {
  label: string;
  to: string;
  description?: string;
  icon?: string;
}

async function loadNav(): Promise<any[]> {
  const settings = await adminApi.getSettings();
  return settings?.navigation?.length ? settings.navigation : serializeNavigation(defaultNavigation);
}

async function saveNav(nav: any[]) {
  await adminApi.updateSettings({ navigation: nav });
}

// Add or replace a sub-item inside a mega menu group. Matches existing entries by `previousTo` (old link) when renaming/re-slugging, falling back to the new `to`.
export async function upsertNavLink(
  parentLabel: string,
  groupTitle: string,
  item: NavSubItemData,
  previousTo?: string
) {
  const nav = await loadNav();

  let parent = nav.find((n: any) => n.label === parentLabel && n.megaMenu);
  if (!parent) {
    parent = { label: parentLabel, megaMenu: [] };
    nav.push(parent);
  }

  let group = parent.megaMenu.find((g: any) => g.title === groupTitle);
  if (!group) {
    group = { title: groupTitle, items: [] };
    parent.megaMenu.push(group);
  }

  const matchTo = previousTo || item.to;
  const idx = group.items.findIndex((i: any) => i.to === matchTo);
  if (idx >= 0) group.items[idx] = item;
  else group.items.push(item);

  await saveNav(nav);
}

export async function removeNavLink(parentLabel: string, to: string) {
  const nav = await loadNav();
  const parent = nav.find((n: any) => n.label === parentLabel && n.megaMenu);
  if (!parent) return;
  parent.megaMenu.forEach((g: any) => {
    g.items = g.items.filter((i: any) => i.to !== to);
  });
  await saveNav(nav);
}

export async function isInNav(parentLabel: string, to: string): Promise<boolean> {
  const nav = await loadNav();
  const parent = nav.find((n: any) => n.label === parentLabel && n.megaMenu);
  if (!parent) return false;
  return parent.megaMenu.some((g: any) => g.items.some((i: any) => i.to === to));
}
