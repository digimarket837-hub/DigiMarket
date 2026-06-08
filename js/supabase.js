// =============================================
// DIGIMARKET — Supabase Client
// =============================================

const SUPABASE_URL = 'https://pvfeegaapmbujitahdzo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jRdCB9B0EX0TQS2wUCwzvQ_S-AycF6D';

// Cliente liviano sin dependencias — usa la REST API directa
const supabase = {
  async getProductos() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/productos?activo=eq.true&order=destacado.desc,created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) throw new Error('Error al cargar productos');
    return res.json();
  },

  async getCategorias() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/productos?activo=eq.true&select=categoria`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    if (!res.ok) throw new Error('Error al cargar categorías');
    const data = await res.json();
    return [...new Set(data.map(p => p.categoria))];
  },
};
