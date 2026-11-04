// ─── LINK "TORNA INDIETRO" CHE RICORDA LA PAGINA ─────────
// I link del breadcrumb portano alla pagina che contiene l'elemento
// (es. da un progetto alla sua sezione). Se si arrivava proprio da lì,
// l'indirizzo di provenienza contiene anche la pagina della lista
// (?pagina=2, vedi usePagination): il link usa quello, così si torna
// alla pagina 2 e non alla prima.
//
// Uso:
//   const backTo = useBackLink()
//   <NuxtLink :to="backTo('/progetti/ricerca-in-corso')">…</NuxtLink>
//
// Se si arriva da altrove (link esterno, ricerca, URL scritto a mano)
// il link resta quello normale.
export function useBackLink() {
  const router = useRouter();

  // Indirizzo della pagina precedente nella cronologia (solo nel browser:
  // letto dopo il montaggio, così la pagina generata dal server e quella
  // nel browser partono uguali)
  const previous = ref<string | null>(null);
  onMounted(() => {
    const back = router.options.history.state?.back;
    previous.value = typeof back === "string" ? back : null;
  });

  return (path: string): string => {
    const back = previous.value;
    if (!back) return path;
    const backPath = back.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    const target = path.replace(/\/$/, "") || "/";
    return backPath === target ? back : path;
  };
}
