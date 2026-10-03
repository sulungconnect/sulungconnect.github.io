/* tv-inti.js: program layar TV Sulung Connect (dipakai tv.html = Reception dan tv-vip.html = VIP). Perbaikan cukup mengganti berkas ini. */

(function () {
  'use strict';
  /* ---------- Konfigurasi dari halaman pembungkus (tv.html = Reception, tv-vip.html = VIP) ---------- */
  var KONF = window.TV_KONFIG || {};
  var LAYAR = KONF.layar === 'vip' ? 'vip' : 'reception';
  var POTRET = LAYAR !== 'vip';        // Reception: portrait (arah putar diatur dari remote). VIP: landscape tetap.
  document.title = 'Sulung Connect - Layar TV ' + (POTRET ? 'Reception' : 'VIP');
  var GAYA_TEKS = "\n  :root { --maroon: #7a1f1f; --maroon-gelap: #5c1717; --emas: #f0b429; --ink: #14181f; --halaman: #eef0f5; }\n  html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #000; overflow: hidden;\n               font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; }\n  body.sepi { cursor: none; }\n\n  /* Panggung: ukuran & putarannya diatur skrip (layout()). --u = 1% sisi terpendek panggung. */\n  #stage { position: fixed; left: 50%; top: 50%; overflow: hidden; background: #000; color: #fff; transform-origin: 50% 50%; }\n\n  .lapis { position: absolute; left: 0; top: 0; right: 0; bottom: 0; opacity: 0; transition: opacity 1s ease; background: #000;\n           display: flex; align-items: center; justify-content: center; }\n  .lapis.aktif { opacity: 1; }\n  .lapis img { width: 100%; height: 100%; object-fit: contain; display: block; }\n  /* Nama tamu pada slide Greeting (posisi, ukuran, rata diatur dari aplikasi lewat skrip) */\n  /* ---- Slide otomatis (Ulang Tahun / Reservasi): gaya aplikasi (marun & emas, logo bulat), huruf besar & jelas ---- */\n  .lapis.khusus { background: radial-gradient(circle at 15% -10%, rgba(122,31,31,.16), transparent 55%),\n                              radial-gradient(circle at 110% 10%, rgba(240,180,41,.18), transparent 45%), #eef0f5; }\n  .lapis.khusus > img { display: none; }\n  .khusus-isi { position: absolute; left: 0; top: 0; right: 0; bottom: 0; display: none; flex-direction: column; align-items: center; box-sizing: border-box; overflow: hidden;\n                padding: calc(var(--u) * 6) calc(var(--u) * 6) calc(var(--u) * 5); color: #0f172a; text-align: center; }\n  .lapis.khusus .khusus-isi { display: flex; }\n  .kh-logo { position: relative; flex: 0 0 auto; width: calc(var(--u) * 14); height: calc(var(--u) * 14); border-radius: 50%; box-shadow: 0 calc(var(--u) * 1) calc(var(--u) * 3) rgba(128,0,0,.28); }\n  .kh-logo::after { content: \"\"; position: absolute; left: calc(var(--u) * -1.4); top: calc(var(--u) * -1.4); right: calc(var(--u) * -1.4); bottom: calc(var(--u) * -1.4); border-radius: 50%;\n                    border: calc(var(--u) * 0.7) solid rgba(240,180,41,.3); border-top-color: #f0b429; border-right-color: #f0b429; }\n  .kh-logo img { display: block; width: 100%; height: 100%; border-radius: 50%; }\n  .kh-judul { flex: 0 0 auto; margin-top: calc(var(--u) * 3.4); font-size: calc(var(--u) * 6); line-height: 1.15; font-weight: 800; letter-spacing: .02em; color: #7a1f1f; text-transform: uppercase; }\n  .kh-garis { flex: 0 0 auto; width: calc(var(--u) * 14); height: calc(var(--u) * 0.9); margin: calc(var(--u) * 2.2) 0; border-radius: 99px; background: linear-gradient(90deg, #ffdd6b, #f0b31e); }\n  .kh-tanggal { flex: 0 0 auto; font-size: calc(var(--u) * 3.9); line-height: 1.3; font-weight: 700; color: #475569; }\n  .kh-catatan { flex: 0 0 auto; margin-top: calc(var(--u) * 0.6); font-size: calc(var(--u) * 3.4); font-weight: 600; color: #64748b; }\n  .kh-tengah { flex: 1 1 auto; width: 100%; min-height: 0; display: flex; flex-direction: column; justify-content: center; gap: calc(var(--u) * 2.4); padding: calc(var(--u) * 2.6) 0; }\n  .kh-nama { padding: calc(var(--u) * 3) calc(var(--u) * 4); border-radius: calc(var(--u) * 3.2); background: #fff; border-left: calc(var(--u) * 1.3) solid #f0b429; box-shadow: 0 calc(var(--u) * .5) calc(var(--u) * 2.2) rgba(15,23,42,.1);\n             font-size: calc(var(--u) * 8.2); line-height: 1.15; font-weight: 800; color: #7a1f1f; overflow-wrap: anywhere; }\n  .kh-ucapan { flex: 0 0 auto; width: 100%; box-sizing: border-box; padding: calc(var(--u) * 3.2) calc(var(--u) * 4); border-radius: calc(var(--u) * 3); background: rgba(255,255,255,.78); border-top: calc(var(--u) * .7) solid #f0b429;\n               font-size: calc(var(--u) * 3.7); line-height: 1.5; font-weight: 600; color: #334155; white-space: pre-line; }\n  .kh-rsv { display: flex; align-items: center; gap: calc(var(--u) * 3.4); padding: calc(var(--u) * 2.2) calc(var(--u) * 3); border-radius: calc(var(--u) * 3.2); background: #fff; border-left: calc(var(--u) * 1.3) solid #f0b429;\n            box-shadow: 0 calc(var(--u) * .5) calc(var(--u) * 2.2) rgba(15,23,42,.1); text-align: left; }\n  .kh-jam { flex: 0 0 auto; min-width: calc(var(--u) * 25); padding: calc(var(--u) * 1.8) calc(var(--u) * 3); border-radius: calc(var(--u) * 2.4); text-align: center; background: linear-gradient(135deg, #8b1a1a, #5c0f0f);\n            font-size: calc(var(--u) * 6.4); line-height: 1.15; font-weight: 800; letter-spacing: .02em; color: #fff; }\n  .kh-venue { flex: 1 1 auto; min-width: 0; font-size: calc(var(--u) * 5.2); line-height: 1.2; font-weight: 800; color: #0f172a; overflow-wrap: anywhere; }\n  .kh-halaman { flex: 0 0 auto; font-size: calc(var(--u) * 3.4); font-weight: 700; color: #64748b; }\n  .lapis .nama { position: absolute; display: none; z-index: 2; color: #fff; font-weight: 700; line-height: 1.18; letter-spacing: 0; white-space: pre-line; overflow-wrap: anywhere;\n                 text-shadow: 0 calc(var(--u) * 0.2) calc(var(--u) * 1.2) rgba(0,0,0,.45); }\n\n  /* ===== Layar sambutan / tunggu = splash Sulung Connect (latar, logo berdenyut + cincin emas, judul) ===== */\n  .splash { flex-direction: column; text-align: center;\n            background: radial-gradient(circle at 15% -10%, rgba(122,31,31,.16), transparent 55%),\n                        radial-gradient(circle at 110% 10%, rgba(240,180,41,.14), transparent 45%), #eef0f5; }\n  .lencana { position: relative; width: calc(var(--u) * 25); height: calc(var(--u) * 25); border-radius: 50%;\n             box-shadow: 0 calc(var(--u) * 1.5) calc(var(--u) * 4.6) rgba(128,0,0,.28); -webkit-animation: denyut 1.8s ease-in-out infinite; animation: denyut 1.8s ease-in-out infinite; }\n  .lencana::after { content: \"\"; position: absolute; left: calc(var(--u) * -2.3); top: calc(var(--u) * -2.3); right: calc(var(--u) * -2.3); bottom: calc(var(--u) * -2.3);\n                    border-radius: 50%; border: calc(var(--u) * 1) solid rgba(240,180,41,.22); border-top-color: #f0b429; border-right-color: #f0b429;\n                    -webkit-animation: putar .9s linear infinite; animation: putar .9s linear infinite; }\n  .lencana img { display: block; width: 100%; height: 100%; border-radius: 50%; }\n  @-webkit-keyframes putar { to { -webkit-transform: rotate(360deg); } } @keyframes putar { to { transform: rotate(360deg); } }\n  @-webkit-keyframes denyut { 0%, 100% { -webkit-transform: scale(1); } 50% { -webkit-transform: scale(1.04); } } @keyframes denyut { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }\n  .splash .judul { font-size: calc(var(--u) * 6.1); font-weight: 800; color: #1f2937; letter-spacing: calc(var(--u) * -0.08); margin-top: calc(var(--u) * 8); }\n  .splash .sub { font-size: calc(var(--u) * 3.3); font-weight: 500; color: #6b7280; margin-top: calc(var(--u) * 1.8); }\n  .splash .rinci { font-size: calc(var(--u) * 2.2); font-weight: 500; color: #94a3b8; margin-top: calc(var(--u) * 1.6); max-width: 84%; line-height: 1.4; min-height: 1.4em; }\n\n  /* ===== Panel info: kartu putih seperti kartu di aplikasi, kepala marun ===== */\n  #panel { position: absolute; left: calc(var(--u) * 2); top: calc(var(--u) * 2); right: calc(var(--u) * 2); z-index: 5; overflow: hidden;\n           background: #fff; border: 1px solid #e2e8f0; border-radius: calc(var(--u) * 2); box-shadow: 0 calc(var(--u) * 1) calc(var(--u) * 4) rgba(15,23,42,.38);\n           color: #0f172a; text-align: left; font-size: calc(var(--u) * 2.15); line-height: 1.42; }\n  #panel.sembunyi { display: none; }\n  #panel .kepala { display: flex; align-items: center; justify-content: space-between; color: #fff; padding: calc(var(--u) * 1.7) calc(var(--u) * 2.2);\n                   background: linear-gradient(135deg, #7a1f1f, #5c1717); }\n  #panel .kepala .t1 { font-size: calc(var(--u) * 3); font-weight: 800; letter-spacing: calc(var(--u) * -0.05); }\n  #panel .kepala .t2 { font-size: calc(var(--u) * 1.8); font-weight: 600; color: #f0b429; }\n  #panel .pil { font-size: calc(var(--u) * 1.9); font-weight: 800; border-radius: 999px; padding: calc(var(--u) * 0.5) calc(var(--u) * 1.5); background: #f1f5f9; color: #64748b; white-space: nowrap; }\n  #panel .pil.hijau { background: #dcfce7; color: #15803d; } #panel .pil.kuning { background: #fef9c3; color: #a16207; } #panel .pil.merah { background: #fee2e2; color: #b91c1c; }\n  #panel .badan { padding: calc(var(--u) * 1.3) calc(var(--u) * 2.2) calc(var(--u) * 1.8); }\n  #panel .b { display: flex; padding: calc(var(--u) * 0.45) 0; border-bottom: 1px solid #e2e8f0; }\n  #panel .k { flex: 0 0 31%; color: #64748b; font-weight: 600; }\n  #panel .v { flex: 1; word-break: break-word; font-weight: 700; color: #0f172a; }\n  #panel .ok { color: #15803d; } #panel .bad { color: #b91c1c; } #panel .warn { color: #b45309; }\n  #panel .ua { font-size: calc(var(--u) * 1.55); color: #94a3b8; padding-top: calc(var(--u) * 0.6); }\n  #panel .log { margin-top: calc(var(--u) * 1.2); padding: calc(var(--u) * 1.1) calc(var(--u) * 1.6); background: #f8fafc; border: 1px solid #e2e8f0;\n                border-radius: calc(var(--u) * 1.2); font-size: calc(var(--u) * 1.8); color: #334155; }\n  #panel .log b { color: #0f172a; font-weight: 800; }\n  #panel .log div { padding: 1px 0; }\n  #panel .tombol { display: flex; flex-wrap: wrap; margin-top: calc(var(--u) * 1.4); }\n  #panel button { font-family: inherit; font-size: calc(var(--u) * 2.05); font-weight: 800; border-radius: calc(var(--u) * 1.1); cursor: pointer;\n                  padding: calc(var(--u) * 1) calc(var(--u) * 1.7); margin: 0 calc(var(--u) * 1) calc(var(--u) * 1) 0; border: 1px solid transparent; }\n  #panel button.utama { color: #fff; background: linear-gradient(135deg, #8b1a1a, #5c0f0f); }\n  #panel button.emas { color: #5c1414; background: linear-gradient(150deg, #ffdd6b 0%, #f7c332 55%, #f0b31e 100%); }\n  #panel button.sekunder { color: #334155; background: #fff; border-color: #cbd5e1; }\n  #panel .bantu { margin-top: calc(var(--u) * 0.4); font-size: calc(var(--u) * 1.8); color: #64748b; font-weight: 500; }\n  #panel .kbd { display: inline-block; min-width: calc(var(--u) * 2.4); text-align: center; padding: 0 calc(var(--u) * 0.9); margin: 0 calc(var(--u) * 0.2);\n                background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: calc(var(--u) * 0.7); font-weight: 800; color: #334155; }\n";
  var MARKUP_TEKS = "<video id=\"jagaVideo\" muted loop playsinline preload=\"auto\" style=\"display:none;\"><source src=\"jaga.mp4\" type=\"video/mp4\"></video>\n<div id=\"stage\">\n  <div class=\"lapis aktif splash\" id=\"kosong\">\n    <div class=\"lencana\"><img id=\"logo\" alt=\"\" src=\"data:image/webp;base64,UklGRhJxAABXRUJQVlA4IAZxAABwiQGdASrgAeABPjEWiUMiISEWGdUkIAMEsTd+FQzV8NBH+qf73sONB+T/uP7Z/5L9xvlorr9n/tv+M/yv+E/a35W9a3Vn/U+3P4A/Lf2f/df4f8lPlz/tv/F/nPdJ+kP/B+f/0B/xr+h/6D/Df579j/i7/Yj3afuR+UnwE/qv+Y/9n+t/33//+YX/eftL77P7V/uv2t/0nyE/z7/G/+n/Zfv/8cPsp+g3+7///9mj/s/uB/3Plp/bj/7f6P/v//////ZP/Ov7j/5P3Z///f/9Fv535UvNP8h/h/2w8+fxz55+v/2b/Jf5X+y/tP8mH+/5Q+sf+r/pvUX+Nfaf8b/af8z/xP8L++Pzz/5PG38t/bP+D/ffYI/HP5n/ff7h+2n93+Lv8XvZNz/4foHe532z/vf530CPsvRL9O/13pB/wP/d5Vn+n6hn+m9FL/I/+n+u/Lz4z/lv+p/8f+h9yT+w/7X+9f4z9qDYObZvhLH/jA88Yom5WeJ8T4rWD+nhQVLgdXx2I6U/W6DY/+/HKAdORhvVAo1n3x+7C7uOEPTw1iy24CkVKYVSHfXsWnjQ9zm/BvN+Deb70K76CN4k9zVGBA4r1qT455Bcy+j87WXEMX4H3iDmdZGWemz7iSC4vhQjgb9oW+yG384ZJuz2XGxDaao6zfBerl4pWznaZod8NTjxT6l5MAryX/+x8f63b6NxL+ik5TEVtIVQMT1PjtnIQ8QSznpd+2ry8u6aqmQlJFoZbxhylIuqs5kn+0AHnhZeelqKZ3M8FMapsScHQMoMZgRRHJ3UfZ8r3eK9CsiGQFQkGGYTbutvB/JxKdLLOJ7r1gyHNs3wciim07Fd/ytCNZMOZjBWEyTUpplQJRWxNWfwDUFwDw6iWYDMMLNFZRn2ft+KFGtBNmju2pwFjQeAG7EEtmT0yn1bjtnr63Dqw8oTZ9hvByVR8hkHD3M8r6WsPuOfzQiP7rrfVIWSze8g+2m2o0tx8A52Wj73NQImWObZvajPkcbex17EX0hDKA7+MHGI3DCf2TgqrKgTcW16N0XwExtHj+PuHeuHYVvPhBYhvga1YnbJCFevUTZPTL8Qs5PK7DlID2zya362ErRmo5kb7p3126AL6ZY9d8RuV2zes8SxOrXfa/mwmp0Oh/2/+QkIPozOFqCf8gzLEvnUSh6zWUu1pXkwCvJct2e+/AsHWUsqAq9/HzSUY+Tdr34kUVmumpa8xr/i1P2gDNs3IxxwKP6seX71LsjrXF5mMOogcG98+RlLGOXznj2B7+H19yYBXkwCyN0pOzDoQintg31AdDXvKsqSjPTOJd8YtdfK0AHyQqbPXYQcHIDFInQ1cON+a71U9OLl9VQOUGIG1wtcdnt1vk+QoN5vtZc3qdBcklV0/F7lEyDhiQg3NLlDECNjzL0s0JMKjMq3yhQboZU91YLF7pNSrjk1ufyakG4XwvvJw9akNBhN4chyRL2ENu11pXMfLt97gxTF1Ik3N+CjPcxi1inGDt1WcWCLN4qGeoHVs3jvfoIbUCErAubv/ea1wwygyw3u3T73myYWdhjwitvGAuRxlC3vceHGVWnQ7J7ROAESVB0WQLAB3N8J8QSc42XIsIoFWEAtvnth4n77LbmweD2XFTAIfBLKpirxGKbw8WtpWpx8nLROgc0ajnjgKOC7U5UEM3SqTVllSd4c9/LBhf5UZ587ULdm5A5N7F0PIPaHtBB5rMAryFqLWv/sYQJNoc2P/ylVn/aAJI9HJDRuZw74vobTDKrr9NvSGpKX+SHOcERjMiyL1y6kbu7ebSjNmUZa5TXwJdfoz9TUCLbibHGLE1+hFYYDat5Uol2UZ8eaFeuh3g834N5gNL2sbMjfOM/Xgp53Bi4sTzib0k6fl7FZYMLFre3yVyaGc6OLREvxXmtuo/SMDgQbZPgrMSkjTsS4zbFnyFUFeVvavaE9+CZI1/gseIYMGCYd6+WXWYBXjyvrvJGQHb3IRGcV0BjvdIHfOW04/1ju5CIf3zAtpUjwvPKwW3VEBl01NHedSix7XTtp3uCRkCdjkfIxJ9hISqDZHJfYqplyIavK+FBvN+XV7D8jGZ2YwiuvOv9hST4pGxzfCbA96j3FGccRBLCwjlQvV86CtoURyNFh9o1pw3P6sYMhk8jmAtcc6wZzw+7ymYz/tEi6KQZbw+T/cUh2eaVj80S7a13oHniMh1f9vS5W2EMdQOX/+liRfh1x36QLGRmi7vTd5nguexoR9gkRxpoMohvEG3GTqx8NaxpszGsGpAW8mADcuLHec3w379PSdOsh8awsF6LitY9Q1QScfvD9MR8T+t1slpwqZ1f3RR8n46kqiQf6mWzhiKiEUmA1jNLxwktfUsPNhgfAv8wp3uBIx3jUkjNg56UVZYVkkB0zcZ3jXqyoZkgmY8g2l1KsLFbhgp/3+JM1jqEHuJnObicW8cN0m+q6fQq9FZ2N0pEbcE8CiRxs4T5TBbrxQC7pEGhhdUQYwq6G4rb1aMlmZreM4t6w96nizX0x1sIK+nk9LPg1HBWid9RyuK5dJQ5sT925gSbV0MBvGFZiNWDLmWy+g5EU8VwTKMZeSYyofuUj8T2jl1AgsF6ThvVjqQj6RQSibApjIvwmx0PG8evyO5R7LDS49LqVXpY6j0uWI2/2z1RQlZUIBJrd1UaaPO59nZ7leG1a2o35EnH1w/qfddiu7lNbgZ6/1RSquQiEvsWbsdVwtlHmHr2tkmjcgAHNykLZFHTWZfKk0y2p+VdV/E/3mRpSFWplnXnDPAPe6x1vukejM6jU8hbFAOrL9LNJpnXgglAj5uDAa+uRB17HH2opUeFrmcKRNjmCFoGpWN/sx28WzwHz08AqB6WrcQZ8S9IeVBct5kHWPOkk4CkjHf3+krfTH5DA9hgEi2UIimna0xuVh0Eadj5rOn6Dz7DS/VrkDfmFB20Hq2nFIpcwbcuTi8k54BUG5krm/d/Oh3wOqPoobwHDiwlPYnUcsT1fvs+ramO780VwZzb8CK0ROespiNmKfGcvHCgMrk1m305ldwSnUVmLjAijABqmfO5npWe4FOMsodf+WNRvwj4hLURGuDIBjuXl3H/0hmLWLaSZ8OzzDgx1RsTIYYYjMqWnLqXhc+hDaDcAhOGWTq6LNZkgTFIwdxM3jkZtIRyBN9Xgzhwc06pSzIvXrzTsUwqt4FSzqCzW2nQp/o//ql4yfiko1Hfqmj1bO8BM+7B0X6SEpnLIGcc0XmLoyCqJ+IcuHUdNmUh2t52+/U0iSwmhSbqyjtjCnoeIX7jfcUIVtQ0WOxws0FvYueIp4mTr6B5LATrfuZS9HeSTHEtdCUTMdAEEq80Nt9jUdPM2acnLYwiV/neZD67jV8MOkrgY3B02f9D1o9gRf7BTtcF5gbKiBdke54gH+TVOvj6bEp3zgEf3SfZ4+bGVH2Uo3Xe9jcjbgsiosGPVyJ1KYpd+ltV0JDOik8BCQanzUu3XDm4Qis7ov1hAYgEfgVvkC67qEsMtWOa2YkXq/PAoSEEl7AEtQhENkVOZye0SL9okwiqRxo39/jxLEiYv0nM37ZdgLHI01ANoy7MoZP+9kIgzNRchYrfIoghyLAPC+6zc4TpQVS3rKRlLWWi67ltsu3HYohjpIj5fvMdhz67EgjDrUuM0ynI4ct/8zGiv7zH/6u3rZxe73BlC21TmlmUUCNyKa5bD2Ho8QztJ+2b6rkLeY5wiCHJmGRe0TnhQ3K6QuxlncUrvWBwLY7ZHw3Fg88cVchA40b3BHJckAkf395BvyX7zXKRd7HTAd3HWU3kKiKGuhim0qfU7Kk1KDkUy61G2FwWpUVlccRS5//Nx/n30ymrXftzGKQTKPJOY2ULkENciDRCIsmd0wCvJgFUV7OaDzTvEdwytWsb7Gt8Ck7t+XvK0diQyws0KSwC96gNq/YZ9GhGyWsSKREo7CjPUHr6Oan3nLWoc570ASpWLExsUW5O9j7MXwNh54trC6/Ytt5c3JDPLP6cWiperi+FBvN+DdpMs2hOhgJpm1ZzYaQostPJbg6ghVBxWQWszW/bCyDWj31co+iFSIiees3jXJhPfqHFedOcR23axvnSd6LdjxwdroW/zH1IZKUG834N5vwYmZuKnxmdwtsnc4PSGorxkyr6jb3MveUES0m/weC0/wNQtwWWrmUaaEu/rMnk8OUTcmL8/y0q5CfswbzfgkAAA/v/jgv/k9oVVuVF/83g/m8H83g+bgAEVTcpzUi5s5Ty6OgZ4ejyZ4yGg/p9QmuvOOr+SRbKjKnQfgyFWyLgH7CPCMIQ5yv5fdQBwpKYAmVQFJNrzkeAZgPL4c+KVFsRshVG/MoOkzSyXhhsCpMmyE0jFDfrJVagvhhTvJiG+LDJsOQP+zf7wT5vig8njoV9N4KiOnFw9G4mc+QjFBXQ83qzdY9Q7YTPLSeggb2cVnCFxr6GkZmjFM7vHN/6y8bxC/dhD6K1ez68mqdmawrdINCp5ZTDiEvY0qjusA+xeGIzNXY+rFezIRUiHj9wACUljJRLvOX2uMXHKBwyjmpeH1KWebFKK2Cbt7d88fxGmJWVNjePmdAbMqn90LILosk4irYj6rBZ1798w1Ir8qHfd30Eya1UzctdBveItn2pA+Udd0W9PKEHE9A7AVVqj1zVVPLegPOuzlsO1KoeWB/5WcOspP+8be6jzz3EjGoigKgur+YIQ+XPzQ9HxugF4xoEmkGH2VQAGLLyT5yz7wnWi4vRsPrgq9FtNIH1YaMy4/2COrYlaTpR7SDWrr8/35UVgL47KgfIgETh0ty8frJJ5T3LLzpM71kYjTjpUaMuNUqxl0TL4xnTz0gFs9o1aZi6dpH9hUyHvNLmRRFOingAA4J2XDvZWX3efNUTyCsR2loYV8nQBUBg0hyBp3y9Ot2mGWlHhqM9z6kEq33Aur/vU2Efh2QPpXnRsIhH3Ry12sUWN6hBs8m0Ae4bXT9DSeSRgxUPMe9X49YGZIlL/pNJum3HaHjG8AqgOZObAoIlQObe7iTM+/YxIR0NVgjj7d0ABJ54m5pj8OUTvDWcwu5oIbjcS5D+afv8r8FkPcKzB970V+9ltC4bIxzBlOTxPz6MR5Rmv5UjZ+eDYW1DOr3qM4AEcF8LmYaRV4KmddHUeQZmDMJRff96Pm+2cwQQfw6Tb+AiOUQWizHsAJVi+PLKQOwvC2kh0NdSG7DfrMNkMIRNjUsveBhhg3MyANIQfD/nw3yVQW/FAQWP3sdPXBSDs5tyTLAHFGwgffBarFw/2uCx6207ylpE6oAyGPO4Dl8SPK2Cnvo069me9LeTe0ES/3z/bR7rgUkYjlUBmKUdFhdm5/ZHIIQdj14adDNYNxPq5TNDnoyV9z1fKOYXXF9VEEKMJF/pOccEIh8hUEXmwrBleYpddxeQUInIzJ+DAljkLhx+kwag04g59b+gy9a0xqjXwViQYNU4MCsZkfTdu0ECIsJ1MT0v76sY8j4LZuG6LgJ3O0veHWa8oOhBJfOb4Xpy4HPBg7EaHqSWaCNndGqo2MkNUskMB37TO4oA3LenK29/MQGcmYVy16trxiFraM8D5ofev/nO5IItpPXuZdEpxV4/4ZEfkZIIRGL69qArYNju+yfUmeWxjo+L7owuuuEOSGkrjRBXQCwFGVEwgQ5NzC0Qhj7W3p2ORIDng7omX0o2SA5mbBPpU4GSB0hcM93pTRn8GaUQ0rNq/ehD4Calz2SMXQTBvuNWeN6DrALBAV5fzMU16XACpYgGfWLF5FmhXsxssXR9o31IH1bfPAYPjrHZcV/aHoVYHGfO7yARjiwG0lTryJYC+2rQbU4XsdJAEq1iYR6X+liHVzWIHDHazW+VT0gvhFhV4O2yNyFwuXU9p7H/ltC2LoJXozqltWt4O8MDpPK7oHs2e0Sps6xsLaxDSoPKKZMNJEEvoI0gmGwBAqalU5eThcGFMGCcQNeCfrdo1gn8IBLUQ1xZo28aNapvgFAYBdf8eAO1shNRSDS/4tx+NKpMY5qcd+WiNEQBIV4GMP3Y7/XkXGzDHjAzniCVkYIgoaUCccQqjhWLvETs/JwPh5UuIOELUaTda5GTIUfGVFmWgf1uAGPO0pX4JsqXK06x2tNbReRTkmx2yK71bFmtY5M70Ry/mmEytB29+S43c6GyjB5pV3AMerM0qTvtVXTvkmW/Ch9P44gSo5Wj7x+Mtkdagcn1yJ/PIFl/i+qkMTjdQ5T+1lb1aVU4laSBWS0ddnNdnnOkjvtGUoa4vCsaXchQoywfKaJN0TWzCkin9fuBLsGNSLeV6Pg9DVtDswaiGdXklQGV34qx1PIznadITMG+S2sCZgSsc7Anw1p2PxEfnMaxfh3Xw0Y+ks8AIYtq2XBNvK179Bqh4m9UwWBhc/eZCinQdDyXgugUXFfmhVUg6PTHWjYka7vxtvOkciupg3xp3up0/FBT+sZKpdz5/B327UQPYJLS70XEqJD8LUt/Dh6PiT5cZ7H0pD2JhVGPzoLl6lhQD1NQYx/ErerqgNXwVbjvUr030oJWJNLBCfF8LHT9kZIhTYfuE2O13cPbMinpcFcEKw1/Ovnjl5afbjLd/GBuZUbv8XuzBUuA02uY0/0gkv8Ktkg07YwvqwzfS4ZHHTGHdAd5ffEsN1hUE+KeXOcOYrR2bd7gWGj5lcaMhhTn6874loVgpnfYTwAja/eocBC7aZEDC3KojoojwrVL7+eNChWaON2gxD64kxc22CuI6afOXGbaM/GE5k0VBHQ33scqWlMUPEFb7ZKok5P2eP4+jiZqnIC9LHGcBGxI4uB+eqRIevPeSNG3nBlrg/tDmJt0MPhO99XuPGibuoe3G+JH3R1uYPyIAWd+bKwHrjJuYHmiUx4d6V0y4DUnO+uBKAoHH/HopyhlKxXe6kyGK0g0BWACEXRxInsKokg+gWk1ImZqu0gre/XJGj8qZhC5d1oEUQfBsAE18JiIwtm9qg5JKXXPz7hv3UGrn8lEtbV/4GZsOb1CzvO4LRHskVguJbbTC7HGJVkgnTgsgfHSR4G5H7IAkSKoo2NZwzw/CJ8UngaQh0MmMhiiILCqMGrLS067yWjJrhZwo5zJ/uxUvOEwVq4o6yU9OFVlqXgFWWEx0Q7+TDLKXCvwce7i2SeI9MP5dBzJU5Zazl/T9UXTNicr845nNTvq/3Em/1D0nOF/6ObtTsq7We/4C/np/x44FSz41CfGpu0RsircK7kozga+TImc0O10X7VXLElrMn9j1STScgyNqN4huNNR5v32Se4cU43KjZArrQkjnE8Y7FUrrR/OBPa69ARU62nzbyRHJV4/7sQ9uQZQe1vgyFtkVccZL2ekFhYrMrc8wvqw7/SfUU4WDNCFHbdsS1n4F34eH8j7CjpgOxMcNjYhyj3jXA4i9ehGeHvFheeaOqT18kNiPABk4Go5u6kNdwcqXMwiomtNi0YFaKVrFbLELLya7O++tOZjrSy01QltIxGMsC5amFxa/qBpX509KiGXWCoA8G0hYeOkGWnFOxx1MRpfkQuXI0MfHp6T6JHGZBOU+YLOyFVp1m0PSILW6emR3iPYabgru591Y1H+csVAnrQb0TdIYqogj8qoIlrY+RzGQbhmudDR+L/a/PK+uWPtkeSkRxR2bPJjdwEhSQJXQ+HkdruQOGsN1G1nJnZh+a32hJ43MIdHDbvmg/UcF++qXfDUmvI7pSO/ZYrEOA/As06c3/YXbImdIgsL5C8mu/F0MdkunGY3cU96L26r/yo/zFn4mBGsKHdfdQcl18vox91u2mZzcS/hay+ewX/6R7U2N7UkYT9BggtW1RudQcEver98h/yhvx7KcmcleWM+7PRP/ixWxfMKmINk3xyyM3IB4IZSL4r7S2TPsLuMkit/TP2nIpRohK7X5ROsyaD31qTXdauSrEvPFlMmb2xlSJNp/nkzquLjIkmvTK9Koaig+IH0CP/0nrEhffh4bGB3YiGSNYByOpO/cG0fCWIVoHOWA2DtLXG8pF47YUDnooDNOFovkNpU+h1Wuit9h8FP7sCQJtAHvUC7Cswtl8pmDSjpUGWjMeP7fbCXPRGmj+x71tz+m+W85leJ7bKMebccKaQZEdBrVEqmKlqiVCWzI7t3bDYYjaCWE+ocZGa8IZNAfwT4n8Eu/dBtt1MXKflIVQX8/7HmAV07DhUBC8fOLVwrm9jwPF6hhsza4rpPzzf8DwUQlz/3/XYyTbnxM18gfNcBuhaq64BD81CHnNyUSr3sEI8FtRQchSi6d0abr5o4xEQaOIzBh4Z0S2GtuzMyNvu5+2osS6Z82vd0bzmUFKxYn4sdL3HIPge/PJ/Hm1McHpNK3t5oKX7ZrJ4St5yaYMEWIxOs5euGzoHrM4GGHAz9DLCDYfqJXmrhjc32a3MqTyOC6UFqmbNAJlyjDO8wzFcyLj/1UICvONMj6QJfkJBS4PdI1l0Va3OAvIH1GehdsOsk4v9sJ4KDdl7lITxief8YoZhImmduybAkZ1Dj5Bg3qRGT3/tzbut7e4vsS8IYcQl5Fvr6Iu5XozlqEy0Mvj1pHcPJfLetMFwS0GG4W0t/hXYStRX9vJI6jCOgUri5YFPiKYn9/hPN2tMqOmmcYT50g87PXjY4CeWeO49opNaw/YVx5Sz0DhhAhog6ahMY92pblWw99xlVAhMfANXOGkJTXfSYqbeWTyZ+f09AmwRVqMpIIfmRVYrtNbjGC1LKCGHnQ7lSO+OQ2QqBZrgNid4+lMb4BfhVNAgxaanbIs7swHlxjKN2OguwyZyBbVA8kpxX8M8AX8u4ct57TsSf75mkE5vcIumLTkofDx18sNGTuVZKHh5/jGoAl4J8rRFdTTj+R8jRElhKrVbMa6wEB/QEP/2uqhJfbeLj/4agoplC6m//kGjI9TqG69w0+ngaUkDdk2uRCmKri6cCdnWPUJP7Edy+Ww83coD4pV2cUOUx6Teph0SqhGWdKL9Rqo5K0g36+9mxP5P/Yu4inh+1kHjhSqeDJYnyAcrIXir83WaQ/4pIUf6uCSCwWIn61UCuvjOhlzLOyAgzXTuauKI3U9ap2/FVm+B+47HzNahADBTKt5kU0NwwPB1OARU8GKYC5C4bOZGidsTrEMCncCyPdeBWnCQMzACD4UG408j+oT8U6XVNejtK6j9CGUBwA5OjY6yWPYAewdDcM5L4VXBfE26BJcSJXJbkV0YTEUJBWO10UQXar5RJToYlaMihA2Rn3EpYKn/NofdyTiGN/qJNroit+QxDW2CY7kaqMM/sMlKEiiWZ0/yvdIxKaunXzUox2EkuRBg0miCGivdmxxsOKiDZo5Up1W7KXPDIy5Jksb9XotmK+bouqydnxZcOBBEYLvU9rOVCGsb9nSPkTBTOY23lNbO37B8PkOvLEf0qg26LJI0WevlbxBIye7tiMRQLUBb//oYAPnVWRqdMVkK61IrXP3/+9HdD3s3bRHEm9F4sTN7HKmO+/NegJ++Xz3XK0ree8aFgyWkLpGZN2R2OPeSbtDtwal3urs5nl4RiXNeXXXU+y1YZv1Om+YbdtEuV0wfFLldKtu+JU9tny/0Gk8zwKRv2+ytmYlQrWuO0C0iUwSGHLi7F55Rq3Gz6Qh2OO3bp8PRIjxZw6/pCcJKuTiSe/ekkTeKdyYbNFKUjefCLNG2JECAEpI6BmGU30LC6DJ4KIMdMucvAn5VzksUw2jP62GrULTDmcxqHftur1pKBriiQDQJFLqizIbWL6xStLL+G3AS5L+TkTvHlz6EdYyEM50iSOOOnVXiaf3+lTkoW94IvuIARtJm4AAAzUbUyBfClIeK0ygl1kyP9+0w41tODyFDDhSiXPF3i9bRlSDCOm3Z9+RwvBvg2yaLr+NETejrszh+PDuhEWxSnWSSQ2J4Jzt2ZlraOWLGs7lvWrHRl2QRPnvj6ksAhCXkRKkEGPwnZ77rgXGC2L+49DLPtg2OIQ8ailX2Oq2OEe0daiglgiBdbhqTMaoEmyUyaJtmMEmSXD/b4GqY4TRi2l/afVUczEuMyGa/vaZUSLFzcDVho8nhUjd8Hw4HnU8D4YiZw1uOAWa3ISx9no2nSh4mtORYOHhaP+RwNEjPKjvtmqAFnLpB53nIeRlJ6Vu+uDORjZVI4XtUuvOUg3GdJ0MJ+V4CVimEl2Yg/XuWOF7wU/BNhgj/YkmtpRl2vJuDN5PQHEe6fcPO4hibkFGvX2WTXNouqGq4oU4jkbaPrv39FdEojLEacHq7FUqiMWUMYqjjlqe2CLkrswXSsvFzJMnzdsKaKAb9fLVEGcrQZRBhji2XxB4hOGH0Pv/hMxs+WJj0Ox84BAU0DG2MHYFvR1QkrbOZSuBt+p/xQFVuhynDTKIAa6+SZTKJyg2RgA1zaBgdtTZ/yBtNJrueBVzOZMdRHl9/BwR9mC7RTfpIdf84g9JySDldpuG5DVAQUonB0BJevCm3snZlFEKNZg9GsrJOY/RF+AabkZc8cLDwlPDpxbmdsJo9XJG8q2zp5qN813sJkXY+ODFi1gn66UGNHfwWtug60DMUqgsgmXr2ilatiaf+blDArWiELqWKistOHiobn4xPevW4LgtmPw47/lDF8UyrGyyVjMIp8WLU/rMcf1Y5ZxydrtknshDcXfj2mtPxeTNGpHyfyut5MfC5YQWnZaevG6X1GZ7BbEJmyuqAUwyboPHCehWS1IVxx0gyKmjb8ZQ3+Olavz3WtjliqA0NExTJcUXp2e8jQE4vHYU51HUWrRFn3qeBCwGtWSDTmSXu/UllA+A+xKfPAe/GI07+vLwEiac5RonWkJqN5or+m+/j5rIZKynpaOLjM2k0L6xice/zo/W8mx9BMTlpVte0kSMUloq1aF7sTn7+CEAAABMVJ1iTDmLRDgwnx1T6ZlAF64l90a+we6AVdRGhlL7I8Ix4p2rP0lgRJHmkwC1ENbygmnQIBNB00aN/gF4MxnorWobhy6Gnzn3Y2SayQTjXl1FafhazulwhoTA/FOYl9V31SrCp/6+C0T/SXb5cqXxeQeeBlddheYuiy9CA6WDOlfmjt+7w/uj77W50W9W/ODae2ihaMAZyMTx6mmwRqzS+E+5SMhKdh8dasJRQYssEDtU5jlxnrN9hrLN0+ADemt5xmGGIqHRWyJlvsLlORhV53fM8ucBc+lBw8Dj/HA1m9gpb1EuSH3O9Y0SkLWUpg4BHavGSJ8PMdYE9ieHSK4JypCwCG6cgxWq7/ZwlVRtpP1dk0tCmj7axxboZlm9ZRcO+cGfvJs7kHBkbtXA0HwTihnKBL49EIy7ZXeb2k0695yw2EP86yAmXmSc+yZANUww5h592i3l3Jrfu1ZCaQteFmzV2f9audoOzKTjB8my1C5Qu6VcMc98EgqpxGFX4eZui3vYgUZXtLQ+eV4LzmT5ETqQYsa3yL3tgdCFvLdx73P9cn07GTDRiX0B9Hywut/3lTJ6JBygt7OPKE6gfYNQWuezVlr3TlK/lwYld8/ISZEVq9P6Hc5iR/39bW13sby5MHMh9Lc594CLEZImEs6y1ZShpbmuhLYzjkc0tq6HkoFjMb4ir3tnMScImSeawHqGS59JjuQ8jS5p6sL3nxs7cWtgM5zD+0FRF6bUygtVtBPPBWxRmlnaRNux0J5Om6Ys0mKjqpz/eCw/iz0qL2lDChQdEidPOPBEV4lggS4DGrFksnHhy+LLR5851ewz3L0UCQ/fRff+0hIqz7oLT1vlppJPxk0DK935KgdPnYzy/wKk8kw4M/24/AweOI1sM9m1sjjcYbGG52My/ud36WAAAsbO0+FTqL1mYQb6ensjZxJ5povm0q4QnxdSb8fiAzaV8rTzU4/QLK+LYshX1ZwkiSn7OiCM1MD2kfqH6OZsudi27eyp1kNU13C1W1p8w35wEXW3G04QW1doklENvkLvVNHvgbvckQm7QutY0ZbqAjJKthz28Wx7NAq4+wBhwac9d3S8zkbdare4lnIW5A37B12VuvV3fxwzkdvNupbwch2GVo04PVwUYAstB1Letxi5M/uFPeBV4+B77aD7/Kw8R/4LhT/MUE3P4M+60lIZSFXWpRectNVbta22Jjivlw1zO3BFKTGdweSJkaas0WQ2XA8ApS+3VYANFQUicr17yD2crF/DT4ibFez9UAWEoRwBaQhsoFJxZpsC2TKYaShyLxgoqUcS2ra8sX6aRRL7+7h3N3Yndx0bki4PnhD+KNKaq0a+ZJQoj3sqh7Sz3pmeq3GRziYGxCIY7fHExFqGLJwPivb29Lp6TnPGEvMaJd1WE8zKNpx131/DN2/FRjsatFrZKHyp5vlVyIHbag2xE0bfCy0TV1xkyCGcR517FzQfodpjAF5SvBmPnYcm7uBar6JMw4/uBXhMUWlrHQrCwN1moA/Ai0rrguhYTpxMHc+u0tK6v1It50fwMTNvGR7IQyXaAeIRXx+CJRBufWkef8YGCPg2JrOhbvK6GjbDSYyTsrVrrQ9TrbHoXhFdonwFTPXJSz/xF8cLFLPPeduc2hXy1MWuaMsnnaE7AA9PJhL2o9R/pR/P/fztGfmkMsEhRSrNz4ebkC166/U8PVdVOeluD/wMZv+tNuu2kupq///3d/X3zbkJCjtW3iRb5MTnFZIaI83a2Da9BdLhh5edFEU37vx2pqIQkYab9zHs/eocBT8HLe87hgMdLNhWtpED28yfJo9HI/yITykMAPm6XDzHKgZb079WNQUValQ6VDfUVRNez6P+IWvFFZ0FO3Pcu+RALzFh2HRbYdXsIwNnKS1C/JqqqSBB9W94H3AjJJ1sF8fYJqPDLW7ahe4bUaKHuni3Q4elDdt/XQcQftAv4SdWHGoOYZczVY5BGBBNojWDh10Ihi791KOab+CAh1TFN38vehym7Qjn5XNJCtO1R+6thV3PsTLXSsV5vYjIqUyGc+jc/FOZnjafHtn+E83c0gfKmU7VbAtlB+L37rs3m17tke+fsrI9ByoqZwntQp4cvpZBI+n3VKyx8+Ib2KWrN31FLyuIiPR/6wJIMiBmfi/aWSVKFRc6eJWB5XQlCjdtw4yal4QuwlGOiGEV1Nxxv9xXu9IBCjY9JmVWARJSnEkCEloxWp6bJ4lkT/wN1S+xtM0QGe6KfTE1U+wY1PoiOyqIO4Q+5K7pu8be3Euy/L5zBIRM+1JNLdGRi73HkGstEqyEM+R5PPO/Jc3YaN49TRrHBGx0hS9eUhSFG4I2j/1Fn4lYufvywt0N+guHrJMXUKajQl4RO8tICN5fJiWOu0Hw6M8ulHMSB+gu0hmtOWu9QVfVDGx9I1i1iuO60jel9nxapFkviA6BK9R1rQYsVBS4DCB3hRtjbHxIKmq3FFq/M8fir8bThtiAEC00GCa4+GZJBX+OD6Kh/7ruCND5qRjVU3fijftKI2fArlQDHMKrLJO8TOcloZR2OgM5YGo5KEgZrjJaZs9ZPsC6ZHmgONuqbaP/WfYmsc+/JZUb4XwS791wRdRuY36IeZ+zps84zqa8/YSFlGiFYVWYtqriJ9Q74s5h2uleuiXwCLFlHUXk192zrDl3uKoOiczasu+BKvxG2N6QrT1qVkNBUP4VPoZPywaxLfJCffWqt2VBqTfrt5XmdzBcorQSPlirCIAEG73aYfGRMU18ujbj7jpA8765ArzLZbaL+HYRcd9li7dGC/Yqyetz4ADn6gptD+OWGqTeCCMcNIGDk+m6dSK21PV8B5wv6YFcqFTDZImVfqI3ybzoYfHYAABVHzcl1ZxacwURlUBk+5A0OqUW/iPWZ2TKpjWwZ2B8HrEVlQznA1fhDMUjyBmp4VdRgJnprIQ8PzlAcTWIJY6G991B2p7sSB/ihI5vXo9HcOJwAI5bE0PG0AhMVDWF6czr+4T2y5R+4Y7MaHNj4+HmYD/dWeZ3Z47Zwf++xQ8cZ0s/2b+HWwl+3FyiwZOuvsSj8dVWpz6mZh/yQPB7D9Qgj153oODPPbq4QR2DQmGogQsCpp7Efu2x/XCZosLdNnL1Ho0pJHwl2yvlwir4yLVA1E/1jLaQQOI0Bi59q5gFNpjttmEgxrHWGdXYwaH+ebDq101Xk6jnbqpI+WWFfGCiF153EYV9s+ucGlZPkp6aaBgSmTnqfCQNhbPj2mPsBI6gQ9UdiEjUn2f8yt5XFXcyHXAUoRt+RgvyjqHYCxkSWxuC0JLNqa7hdOBdCFvPE7qB22zP8yD7z1hjCWu2TtADlZyqGL8uSDAw1EfJMHaQTCvN0KTsm9AfS4tyAJHimyOQCBEtUDLBlyJ35DiRsjIwiMe9oDa9kGyExS/1E4WsDzlHS/n+TaS1A7CwP/PNGuFeCR0i/REuGVYbt43A3ypcyMakJS7P8QP3x8PIJ66zuuW3J2UFEUaTcMrkzGTRwRG6USCvjaRTQX84WYQwPPF56AnAM6moywu/XPc8p4+ElkiryvOprrYMNya/pz6tu8FvbaC5Xvrgwb2mmOlv7CtztUT9hp8hQ+Lyc8hc2ZEWNt7Qu2ClN+2eaYpj0ZRS8OXwnHqBXEvbi3dMyo0N7CBNYJNmGyLg+put3xtorekEjZZNBT9IH5LPOssZOHw7DmqFIt5Twq6O5CST2/0It5QLguK0iiS7GSHOLhMgYDRkRlaocj2hPyob7OsP4kU5TltbY63R9f8TMj+oyxxrqbHz1f/IEph4AEliesuAK+ju5nezErQjWfCbjoUXB/ANvXz0P0LuavuiWEVdjzv/7vykqav1oWc384SgWqSw+KZGNSXtiL6pdRKioqQJgEod6S8Ss34T3GrOp/WsNGFC8YGkvUWZtAfbWpV3JTLxT75VXD+w9JaMVPUvXthdQeiLj7KxxehnL+ODYPYJlQakBQcyAqH+Hmn3qyJcFiTYSRF+k/IdUemtnr2HMq4be6mM4rQfpBxS1OI06omneQCLyZtPe7cwmtZ0NYssEuqeuz57ape/zxhilFoD+tPW8polKuvsWytTyHx1pqcvRJKRuKmOGjqD2XZyanrLRnHv99KtON9+Ev7DKsOBDInKuFg9WM8rkbIcnikf2nC4wancTiZVF4Kd6XjoEme3IbkT8DpPTyaDJbznV0YQq1Mc4Vvk5PTDMgIX+zMqdLvDUf8XuB2euSGrh8DvrMgZaOrAY+ukYb3e+27MKXMCdJusiXZgj1S5hyF8siDMY5evGQ2EcUhEf775+xnPsW45PpelSpTRoI7sgvzneH9y2ajLPoBtCOJHHN9rPRC39S8eTpodCnOCL9Xn2JktdRBUVSGHrt7wZz132EXoX91fgFEqgKjwhO/7RQmsr3hYHn1WPgIwOyhP+QngdFvm4DdgQcq1sVh4YYrZQGQAIx+/q67h3ZANLmrrIf3rY702Lenm61xqVdAssRlH+z4U4vU3BlQlRlRA2wfmQEp4XbJysIGpjo6TLd1K+LJVjvWkRIEILR76JQ6kpw7UEKguH7/2XuADjC6vUcnKwkCAWe4Fv4xaGakt6xpbCTnBuHkjEk4OaHetEYzvstM/SEfvs1zrleIE2fdALMVemfxaHb8mrEvOgYnQhILQsrkcWyqgn3SNgs95OtiOY0qK6FtZ+a6JNVnXWCd5481qMmN1Uhqq82L/nlnpWt67WGgjk31gYwyjsmvNgsPdW1OCTegb5Ut3xEsrOKf1HFo/GrNtlQ8R5zG8GROvjBH9uLLy82PA8y4dr2nc7a1/HIBO/Az4BN4o10r/OehdmPNgvt7wGtApIvLrOZJqbOiCOcibnVX7reGVgbjhN6vfkVkUMMaX0wKK4vhSvcWO0G54E5VLu/xYjwN0AAAj6XI/Dc2KBrxGeOsJqSu9vIAfwIpwxixXG0Tq5h9iSlnXTLwQieY8cEaj3uoECohr2hO/ScYL+U//GDQvzxJNMjrsQDjvS9wdLvJ0Sxfo7QjaYe0lNLBdgE3A9EbupADzqD53DvQ+/eq6CkXVc/+QyCMpueqAUJfu0CDnYfyiEM2vkZwvGwXQ6bTm8uPQSnnVbWKVomncnPi8znQ8mrZ5zOLtkteLF92CObN18gk+FzBY8iV3NUQZi5Sc+q+Kd9tCn6rC5b4zCG1Iu2n4cYaTqgMV3g5IYJClfcgMa9Co+BR1kCCAqWKHJT4nGpcEm9KsBn78txv/p2RrzuDOnzKQgr49IMK/Oy5GOtDhBST7htaFzIwp+n6xCqh7tEFYvWQ7w8nVzbWuGuuOQAJozY+BeXyjoT3sO9a67t53Aotf2kqdJ0lffSFzdj8JEKxB+VL1zfcvKK8ZO97E7DSG5pr/es3pFT/xvXLL1Lnbuy9axOMVPzLfLRWKSDIsrX7PGmv4oXwZedzT1UY3bADVd7VSh4rB6IK0nbNBQqD8acJjoMgUzlJ7NUU8/c/gttBlWuIT3vcf+Mp17xb+ly3s5N/6fwI45oGakleitM9Ni/IlWtV2zbc7rNb31ssM2Pwca1xpuCxK6LWDTIKG6y4gKUM4JauxUCs9u5iUxGOPW4QQxS+8IKjeR3ntouExQYkLu0snnHIhKKU7n5uEe3e9Vj+HR+1d19osGwPqtbz0deioM8PMT2nrhx8HkrPMHJilfjBDN9XqoXwcIeW6tBIamhcBpFD/xGHbXeT75hgmooUC6Fkja6s960WjrDsJ9KLRvG0Wktby3jYG78KVAjD/ISuzkvc+KEplici+x3YjfoCF7olYwbrcDoQLEZKY31A5ju+IBfl4rQzZuTsd3vPAzuibwzUjjbuLwTYfGTU/zA/iaoZL6bvVdqcM00/bFRQQ6xNYFXqVX4PA3+nlpuj9Bl1l8S1oPwJAjC8FM03+5Y3VrENopSKVTdu+/g0J/MsT5CiEzHkIKE5owDj5cB85Zwl2ekmD6oMON9s1PO9jCISr4a3Sq41DTchkf4q0LBFq/AtUW+Icixk55P97QuStAW6KRXcp5ESBtvBYD/e7Gtt7kMvz3n68zoaeOc1bQgZP5gDA3Bb1MEwg1YKl8bs4whLN3lidsdYmmDLUs3mYhzfD7pSSpp2ZgWUEzjhX6evyXKhcDb+nyp4yJqFYPOWsd9kmf7ts1TArg3SBtSdZeD7E4TejoO/SjuUX/E32XGjbBa41wiYGt4jhMCs2ZuD9uUMAFCs5URpL32h2Zr14Awr+Ag9wLAaYoa7vqZUY6QXOyFSCIrMwwiFcOZ0rS+q4LOXCzC8vwHxnI6ajd9/V1zWqcLi9+VoAH2pvQ2ibhM457N3u9ClrRmvCyG6ODhJo2d9fFW4cA+A5Jygx2zV0seGwNV2x0BVXlG1WvKS8/MWo9HOtW13LbAlDDEyXNSh+FVOfUUoGuu3/3PFxzYklwYnnGIGTlgTIuNKI8CEMF3pi4BmRJ3VXd10t13vhZkI+znMpF1HiVtgxHRjvv0+o/fgwUksaYTaAmsP1L+bc+2iSTdmmOsdDr9jQqhHnZgoYSp4adRZt/mz20+k2bID3A9S71SDe7ezNcX/SJgRCWVa51Sv9sWQhRXhJ/uZ4bzarTZBe+9tco3Mi5cp162oDgd9DmQfo2GFgRYq9iyByjKgMiQHmSAjnSyMBfoNUwOnhzPnNehTNi9o/Q+yFKpSrzbg3L1Jp79bvqGhSQ3jTGidUUkcUTJsHdyCgz6ik6s2A7Wboj09g5y47qzlPe6IjQEFWzV4ii513CF354qEzxYtDVt09apsxuICUi2CIQbrVewrScyQv6H9eiXFblN+/ktBLyirfgiZJtEbqQ3y4Qv5ePaFRQ+bHb1qv3LTwGkoSMmA0bhBejO0FQoIqsQHlzDqma2dagGgT5lrFZhvBpEK1Z0FY0pLxxnxrnPAXJzz/DHmLLkjLNqYSz0dxymjJ0y2gyWJRIFnN+2St3u1jgCfKjx9151T5DwJMru2ZMqI71amYt8i83ep/p2qVTizBPwoJwJU1tPFCRF1+IlEAi1uwTv+8FErWzudTgJOavuzJNpv7ea0zzRo+FTEW6t+dgtF63QB+88irweZuzAdnZ9TQPgPyFVZv4wKjaAAFu3MU8N15KXt+w6ZLVsMf5y/eIqLJiJ5qBV9SdG9N9wTNdZb8OY7OTLtxwUJB+ALZ/2htNTx749mEa7Z4TYXV/QoStjfyDH3zfU2WavVVr0sQQONSTy9amT1Xyluceql8W2OBKE+NOZNYM6E3gU3EZHLaQ/eIWiob4nC10XiRe19hz4f6hnz72k3c3fUD9FRhIo91RC0UjqseaoNelha9G1XHy02zCsJb1VfOFsyiUABfp03gTsPERzzh2PftAse8fUhhIUgO5qyoMWYT3D+vQpa5FsI/xmu+MqYwnUQ1frWy6BOhKuV3/KECPK1/xjvh5ARnN3XgF9G4eH3d/nm1K5F3A2ysa/5M7nmsl/lv5dAG/p5mByrIjJPb8rOKo6Wtjb2HltBsYSD2v0VKlkOdgby8qIuoPjvnb/RR/5rINZtVq7vkOh5N2KYf1iDGFvxTEHp/IAl0oH5RbMKTbdc10MQwBzq5IIF+RID3dM1WzGZTMoorqtL/Ax9PPyy0hnQ0xS9M+tyb8aKqEZDv1AjQr8AXFps2edINw5Uc8Ar5SKTlCy5yEaaAFio3igVHKLIGYhWqZziANQeZw42rJkbuBMgISVCA/IuaoNDR5mOLl2SYXbH7vdRadWu55KKi/wYQY2Xkg2YVliSQBsRWvr2FiymweHujai3QcXdsaFI5F7ZnS6cmlu/waY6sY7UH20BRJ/fTOX1Ep20Z67GB/QoLTwfPwu8Jgizimped/eoULYSwbeIGVFfMIEb8GQdaTy4bo/oZplXfuVKl0Po/w/ySVMCfw9QcIVsCeBxc+NBuxv7Jv+32a/UBAffXaUHvdRdG62mbchZ+gieFi0YLue8ekKipfNzoWSeR/yqzNTpMQExzcNDmAAAWoMbq+WtVTs3URkBWgdaFO1Iy5volkEop0OO3JfRfsc47k8kvxOx3nFZizaj4GZwwvi+FzLibW4kmimDzu927oHNmKd77TZqxzzjM6Hi4wnsi9qxWjj70hRS+QkE8cd/AWMN5NZfCPqKxpLbHLQk1kLCFWPLetiNH5vdJ1sEunKniV9UVEO3qMjRronrIxqPWDXcqKbHQxkIrenBdLAL7WCBsNPswQkKeE5jf2KdNZz9UvGcKw8s74+lSSYLOX8n9cw2Ym+xFjcC9Ys7LmAejy3GcunyK7jf2q4Sj1Pr+uxYxlDwC7bRzwvf/SASm4FSSj9L4nnQIdFNOm1V12ZBkluLE7ggUymc2QSo1cV7svSBL4UG+IxdnQDu3GbGCss0RhWX7j4ycK4rDUJNB97b0ZlhNpnG9QPLE1SjQWpQy/lCh3/7NeCjUMsLVRCZqlGi7ts+gVXHlvyD7xxhpG0pxAidDnTyfYGCxeNWpyAZ2LUSLPr2F/0nRfP0v1X3IJYIJ8yH682av6t78GggRXg/c8hTWai4CzAN+yMtnNeNAkkZ76RZMhct/6dJPsffB1VQ/xhE29WDIefXyziIGARayEFIv3lz1GjDyud5+bTD2ETOgKgh3cgf678cUbHXKfrLMTkikcdl5kIVhqXfajzghZFWcxwzFfd2JSgXi2T6yrZ1M7ZWsNpVjtHxw95pls0KwJjUWkKm+4qHLh2+xK/aGb56m9sdbgMdtm/PhBoxKfPH2clTtzJBA9ZtavUTbYf/TKE4A7o2ALXj004rK8Yjas6WKKxiyTUPbKN2DoNTELBwtaXVjDd9mX248nYlW3kFF8rKZLz00VmnU7i77H/xHBCgLc+3rnQZsbuDISIztDSC1CljmZC/4moMRIJKWdWnJS6EbiXqHVhL7OqLFIO2z4aoRH70Jj3h9gNG3RkJwWXiIXQ996Zkhv246bMgHGH2I9xICpTg3soYb1CEfzIf4lPYzuOe2JE+YtsvJlqEr9igXtyajxBQrGr5IgLwiBHHOH0J6rptLNE9EafTg+wuhfuQCRUFhOINRKrAF0aW9+OxE/IDbji/cw7l3Pj2+/Zr8o2mx1eyYaDQEpdKvoF3AOanGlRigOHgb+Wgl1HHxazKREYGZIlA6J2y8kooRGZ6KIPfz90v9w5He369zcIL9fPFu2cHqV5X7tEbUqIi1Va/VBLBFcvdBMfhJxkVNlkFJetZ36grqS1pIB2RC+u9p9BfEFoJgKngTJsUvM2YMUJSGUbjxwC2Z+0+Byz5EyOKVT3kk7xv6nVIjMssrqO5jwoGA/HnfVzduH0RURQbsAJ6ubeI3n7Zy7Z8IR3xd47InaAiojasksuAccHmbDuolOCwUXvERaUNoDg/VBoh3DVwSLwm4Af2iBjYmB/4ZsEh7fFQm5GFUGQYOXODRYvSc8up2tGe+wOuDGw/hNIry1oVIzt14jTaoBuMVavwHruim/NktIU0tGLA5lJqZRwvaYqVqCbc8O7+igcC5wMdlEzjJGFrVgHyYtPohWUyZoWOK8PniyHGnE3bT7/BJoWSAZM91aqhXu7QvDjrYRIhFMZsNcnGNaLaK9jZIKBVtK/wzOBS6g05jwN8af6SNrMioMQNlquqGTUQ8NvMOuetSXh7GbrWFnBYIgmPCpcWL/Pbr9pmqiy9Jj5roBkDikoLiLV5CXvf84A3eJ1JOYUm76xlpZL8N6oxMmk/dlHFqAvxWI44r/ufumxbJ8YJU+ccmUcjNvfJHXDIrcrjWsWV1KiOg3TIfgB/b05P637a10Mil/gfqrancrHy5aku4t3INlqb7JtVvf9i5NTbZVoqxxCJFH/s6WEt6+JeTN5yCn1G/u9GOuXWjXhCAHLmvw7JWKX3tlRgdsQBimh2hX/mVPx6Eq1jSHdkhDQT/P9QEZlxKzVjeJeCFLbZu+4HQVLAt6B3pCL8uiW19j5jPCBrItYCx41FHaHzPLMyGkMidqg831qUnXTqSKsfw6bCQkE+uXrTugxG4N8b+miuRMA9kiGtLfmXvlrl3UGzv0QA5laoR+L9czgbCJ0ami3f/4HLpHFVXgU73saNfodhV0IFW4A4FSkcwpJPitvOVUVWyww5/jcKZcb3PnbTHyInqIX6KLMmbBls1OhgmJB4D32UCtNtI3BDjRtkXYOP5fd+gfE4iy88f6X1FXM8/SPZ9MZM+YDhY/z/uwnZZQkaxyGqAIgg0x8O8GCKvFUmkKTrfhqCofY+2pr8XG6DPqt7pz7p0Vlk+Qaf7pm3k7QQovcvBA1qr8my5IOvRFonvoW+FTx27ShRgS5ztetHYd0GV9wpMDABP/CX9A5lCHwWyJWsdBQ/1Utfp9dMo3hyD5U0+jxhjnkvsVTWStNGR8wkOTok16B6KeK8nzbKIT6vKJJgSMHnDA6njQl18k3+pUhVBg4446u1dQEas7eJaVadGkr8MmdTYQherTgErh4W/vReqK7MCVZfU73dVifS4LTwurh9JUr3F42eh6tfKhlmb6pFljwASaZPjMQksR/j5GW1o1Y2n3Pz4bKgjsccAXCb9vO5PhXS8uVyKQWL7aoE/JZlgICMm4BVwvpj5PqOTGlNpKFDA+tbIYw8fn0FVvnVyTejKBOQKVk6ip5WHGDaE+zWC9fuLaV8JaCb/3aNRjpxZEO3iow4S+O8Gkp6+1urrPhSqCpwc/pcGCoExLHjtTBdr117YgoNSINS3mD9Ai6353RQjeYBbcE1NwCxetbOjdRSA5S95LFcgMzCi36sspTf+kxWhnEVxkfdLojNHz4nH0eemivUOwyWkgdUm5Bgn592Ro5I2z3vh0IRZTbwBlAHDUB3Kh1u3MHFR5xqcZopsqn7zZ1YWQZQAVzwq9etPyuG9Gt30ZgRgRlb/SQiCLH755UQT8qGZP4a/fI9KO8/XaS5+dnWhveYbDEUErP3tSiMy9bzHBvKCeCuF2nCY0TN7ahfOsIJglwnRRFZZfhu98cjsUzgCy4QRP7oN2U/D6mBsxCDlgLM7LnEpmWni5nv29aET8FNTVHVs76Yn4oJJ+zkv/FMXN+Nc3c8jDhT7CkXY5XnYg0bpDtDyG91DkX8nwUqZMK+nCEgo3L/sUt4/FyHEoti7fWOjiIQ2kajM/xgUpV6JM1H3zu0/OCUH1sb7emFxeWj5a9usuALf4gWh1bRFP6+wWDEtBUst+pIyTfoeLWkxZWjVxg+b20ULO78KagvLTb4wWmF8PwknJTdawYBmpDR9qRjcyd73n09yZLk8UMkiYmwO+LRop65A1jndCeCkyJ8yn+w4FHy9ti/TRYferWDuLE2RJqUTLU+ulEuirvExpTmcmHYhoQbDnCSQO7l1+xaKgcNRg5PAOsYc0EePjPggid0Fo63Bv31gWOO5+QG7IrRxMM8swjMy5lsRgk9ml6e9R33GCh5XHoRgypI+My9KSkt+N3u67jepsdIYcxaO3sRtTbuuD0zyPL6UvA+O9bRXy1Vg6oMq0OSQiZCnqGxQELouZTJ2BoD26P+ZUlWzspqQf67VSN9TvWjzkaIAVHpvjzabw4rHvX8He5zsouPwtXfTt+itz2glLg48paxucjCNgDnp0jjyH56Of37iD0Nlt7t/R5/oLyAnNuKXi3XfgNPCK+2B/GG8ghpmWiibjGOBt3CrHwEyK1GLLUDjDLZalXCZ/ITKFVdFtVehDyHb1x3X3AsfZKy1xuiYdHzTU9mDy/sbF4auOxa3AX4gHwWHkQx3JFmGA1ewOxQZFT5kKhvI0bwlMi/1s3Oo03qILyzFRyHWyzXPmTaWdJ/iOSAWx0uPX5NKvWOJPTl62HVbfe9mROp3AhHpM3xqOaWos0liMAJWkObwRD2JmSiPt5I0b3xybGLtBejljgRlKMC2Vo6es4BY6Digb+PprBh0T0dd9MJBV6dKWSQ2zsnajb3VbOpPjLWZ6QsuNgiHfi2Vt9NZ7egaqpQnniZ2v6iEXPHSeyXraC45WqFedEUbwewV1mmSVSqpUXhhDZ488uM6+aFMzIfpJFIpfauGMbQYQFIHdwlBL2CE6ZRIr9twchTedIy92XUAUpmr9F7OgdYyKrgmM4k+OCSYzXj8Bpaf9edmzAN10snKrrSN05XJ+CYnlazY4qVZQ/XGjuhTm/13pov30oP44TGfjDqPP5nSF8uLNZekJROdrX7nfAdvEDQNN237cVtj50/yZLIL6Lm7C3VFrfMOj7/EHGbwrVZPZo1yxMdz/sy/6hOx8wrmTp7o/slxogU5Ss0xMat5uQfSbKDIzsbyAX4jON4U+aq6iS15aOX/JkTOkiw68wSmadLf7RLWyYjfbxogm3he11vY3jyljf9JhYSC0+WW2YK+SOuHMV3rjf0/r3JIxdvsTythCnzPcPaWXbigZo8t5ARlTzFs2T8bD+I2mE6e3eAlatYCr1w0FuZPmKu7AqPnukJETFpMva5xtJhg4vxXQnbl0KeNnBveOxBv0ii0z/ArsaZNyhusbgE+5oucd9ZiBvfj7kFbdJB4fN5pqZNz7enJavIflqs0Wh5QHb93BqkohsyQwQJDPB/5WVcegs04EJM7Aww8v8DM9zbQCXc3aNGWWs/RZCK/gTPz1Iad5M+g8n48tPBmYELn2ocIsN76zv88xmlDRFah2m43dXRBPoKliOreVlixqjSIIJBG+TQ/k+L8gTUSAmvs116EGLZat+A9X7MiXV4wUb8jVvWWmKPXMnyphNeRf0ojtHqxe1PLwNTmEmy8Sd7/ojXTei8+ZC0DkMq0vwFQpN5YKb6Z+NfhKDoHAhz0IPLIWqxD9KyPFsYLKVMgpLte52Zy0WboCrDXd9f5/TDTe+YSn032Tad/5rzfaagNIYaiUKgDaa/+ZZkHFX8o3HQIglryauG/zp4mLFhRvr/pQj6W9d+QFdgMZjEBTTLIU4+7QradSS4Bh8+Hz/uqAkv+6t8kIs+x995w0WBygbzbD/tmIVVnQAoBBsxacgq5JAYvA2jOMYvltmbzAfr5TjU2zdPiX9gMsnR0yfN/5PHQ9wFcFhLcvTLTfXYQnf9e8fU/bRZv8jeH5bTYTHZ1CumuKm7WNOOPcD7R7uzGtIxyn755ckzV708lDpUTXMzZE6xsOegZYS8pl6WNa+gyDscSPJbTVmcSaVxdlEEd7Oq6xQ2wvL+h1vy8zUrdhLPMxd1F8vSbjfklUGRvLHSoYvPTlq1a2gcoA1JrytZ30zKNDbbJ8PHL0sJYaEqgZCNdP/XxraEUdPCoznYclLirA2ALvUpOvk0RePTRYmJ5fcBs4DUdssFJRbmK9svlPmteII3cG3KRaMeTitVEJKd/raYXxRYoXaly+mdaVt7tbXoj1Xt9oIAz/j9APCI164Jh+Rh7jFaZ2TFIHDkq32b6OjvgTzX+Vcv1+H9sCrDXK2FsvD4aWlU7LaVDuLGCmFKQBHzk4aQmxzwLWq6rK1cG3wcwt62ZuIW23BkLDbhvaoKa7y/lxUE4PUxiQRvMjU2RKoJETHxh7dwS3ghoUpjRWcvL9bbUy+bGA/v7orLeTtcPK/nmVCFWLBQ+WcNSOw+4wf+xsBng1iOVAZfwkYG2c7sQl3Peu7K2SErRA9FsPYafE0qSyBwI6t7HIRWVKbJ2Ru2CDQHKjtxNl46EQnSwYBv0sQqhIPiJqlP/H6w/PXSVcAdT+l+nHQcE7/eDQHAHcXmljPTOMazRacoeYgaGFGIzKaNvIXb61KiRYoMAysNNYG+7nGbc0NjZvEqNDc0KMJjgfhj5U68VeNWEAifIrvJF+0Fry1pND9MlmGzcbopxObnAg5IbTqmFwiepSQDwrNhMpkB/+eBFMZF4qi+n9wmdZiTT1DwN5/hYHEvepYcmmPdCm7ab539b7yimLZJy1vjV/vslG0C/bJ1cEYDbByrOkP1HAHk7qc1G9rINcHJnhSR6HamZAbLvQZP54fnUS1IDFza2r3ZRhSaE7qkEGIWqyOIiP2WIyAiKR8y0z+6e4P/NEIljWYo1aMQcYX/FwQvMF9/0aQ6HUTzuCmperQlU2zAfIbDNyY071Gvj+f3f0s1qC+K0K+cf8sEjlh8Yy9ULFvg/RKLEg1UG/+H6iNv7S2xH61+z4yipoAHbtmMtSoOYinbC9Sm5nB46s1s7MM27+demCWGj2/tuVElpwnm5pKvLMk5Zk/ucgGSkKe7iMQx7xyEMT+8uJdS5a1E3gw6QzhmR/szAuw7oQQoZBCNVymvPbMqqlnCqwSwgkFVTAKJITpOGWhBjkkNtVudrVR6H9u7DdIfMVmCo/0tWSTQgJPDayKd1Gt4ReSO6YRgvihf6AKLft8LV7NXT/DC/K98FF3xfLkXKFTdGYSU91yFbkTIj0D/pIssxSyKfQBwcVeK32+vZkGM1SVwsdTJZNMt02ut9rgxlVViBp8zJi9x/nPx6VwEJBluVhJF5mEWDn4RAuXMPR0eBr3SzUrLox/MZhCGpp6nGbl3cQNmn6HGEzYv4ohtaqFmkEbZ9uNsd8lfGeFD1THIPhoE2+MDA0q21vNiB9q4gNoM6mQ7MV82Eb3jHiO23/pIkjmLhnPbB0XAigDlvxQPSjVAHH+nDunHqty5UBczR+eGhwJX7iotBZ36n/CJs4HlXEWznN1VKUyJf3gk4+QZDpDx2Vsoafd1X5JhjE0GH9TQbHcEuO3NaWDh9XIZflO4wb+Nft5IvXqoyUA1qmoTTb5/l0hNdtFJJgvaam3UzJcUjZ1DgtZneOHDL9hB6+lwu2wuynngSdnFDdQS65lkf3poZiKLD1LORL2uQtONdr/R8ANzi2egBvFkTQhYUNzSM/wVSXRMPnwgjV2abVcsWq8svdSEP2c3czsMzITM6PCaQwIToiZ3tR8tQ9vRjTzmjsZbxA5guElgkX10fdPXWfvUXk5GTepwLv5Ak2hnehWoHHCzwtJUokI3Jl2gTiBNXWMucELT9lFvXHHvFo/fai4NRFLpsnXBLy1A1pv0ae9D/0/KqTWSdjVdaGzxO1dT2x0BjUC1b86UUsx+P8uA9eVntruVvXqYk6BAC2SKNL4lH6EZlGXjpNMEhH2h4FDWTRJBB+UVDAyUzHxkdZO0C3S11sQRLEFWDN9rxu613TSt4Y+86tP70wFidtRWFWTlRilotfIx7CyDOsCIRDL9UQv0XMGZKgqDV4inBaE3a3GsyXvNgS8Pj/XTSgYAVoBqSbfEBZ/bgpmjcVfRgx6rJOCgshwpuAWeQVaH4SLx1e2StJ7xyWAfZnCP7cSqE0Qjwdr2TfGEyA6F8aHaMof/D9yjm8zhwfAAQc6sNBxJX0inLt7tApFPddnwuELv7LRWkVIgrXS7OVqqUaK1RCkH6lekY2jgJUiTPHvLuvpcxIjZ1WSavP++IYimluzxhaUp02UOLXRnJuhyzf+DZrepX9IF+0JQOGIFX5bgFYEOPHfd3clCq4p+k0Xs67pJ4CicbMd/uKZfqR6/e5qcDcrJo8Ib3c4nf+gC5l2aqi6P8thDLX4KTIoUxdEKrQA/YpMqoxv4SjGA7c3ze1GXra12OwuuYrYJTzQeEiQOxZqtHiwOyQfHNK7cO2zwWpJgcbJaeBgyB4YWf9ez3SNlla/Y/WSSXuWwqtBvJyXoxykN6iei7QWh8rx+mrPOm9s87oGm+fh8NY2SwIRPRqYEVq0NzI4lF23QEDL8xzdMb+jWA3D6KCaZo/+hw1RjVhL2pW2vMcu1qVx44DwevhC2MeVwYtu/xRcRtiFvD1f+lrM7z6QPvcA5OfUad5V2B26cgAJrJD6yMFBIW6b/gkoXWhybuozJSX2CtSlk9GsSa730aBua5eahPGK0ULF7VaNYMghlmVOpa2/QrTVmuc7UnOG1MlUtpe8nBnsppPezBERp3P0Rja/gnWkz/9hF6lwwaCi8rxpmFlzGaQL6gagqeDTY7JDQUBfP0JynFOBmYYwVGkfYDdyLWZW2yGVeCu1gedTCd+aCUevlnuLEG8GL3G/zkQ4qGrsK7SO/6MdV3IaNwwzRsmhuscAAOPjkg7pDyBKbIyHHqW2+H2m+e1E6hPz5fi2Ilwe9hdG46dyo2KciND2338StHwh8sHlnCSXmnXh9bvL1vQdmVZitjf1fZuV7oTGnk7MplaTxbkqqyq0ONAf1yUnP6k+sGic2Fy65IxstdTPQZwbexQgwzU7THMnjYLIpTCUPEsvC7nvDb2gX88DDsyLg/BUe57c/7J+Mj/ZqxU9X/s6Gm20RD3PtGjj6Z+xDYScCSglRbyR/MVkPN+1ldHzWzeEmIEdpCoW563vKCioUyumvd/FGnbAWlBI/BMiBEJKpkbK6zwfbS9Mx+PTOVCl+8qnys+kcDXmolfs1Dd6omFAIuYUpxJMhSTwr9AkbhPPecPET8fM5WertGAQmDqZAKT5rmHwKT9b5ODIavW3GN2npvpjqRIxCV2IttbwOo2+WXp1BuXCmlRrVibFfex/yPwPDjThBM5RA2QpBdShnQVZL4ybxdkyiWyUTJpJxSjvtwWSn0xkpbn+wxYGjk7Lnkg1dEoZ79CZFNWtIzT3XRbVjumbBfnweR6Wn7XVo6PFKyajmgaBI8e3klglYcNoTpbYIGPtq6zHmf9iLTUc4/QNz30BKoM2nFczCjmY6MBJBzYxBzXGs4jDqf5TGBlfXnmRp+LLI55RRiRiqyI1/hK4uPAUBfwB42dABANABUjHy1m59VjXfedyqTJBUwRDHCcpiDsrGkaQrkPM+pFpSPZcKxejYQB31k7e3hTJTRwsLirY0tnGcr/AISzdtt7j/oB0Wh9IvyYfc3JbjEcPQxa1gkzD6pqmAIK01rKo+X4Ueapgj6u4yrwogGqxxcooEhz00hU4SkeUjeYmEXxzOobXmYtJrNDj/8syNVO+lLUbV4DCLQFfKpggItnV/WMxEV+TXxUeg7Lqcaw4elybNzuxTkxKckiLBx5nEUxRzfxfZWDVolp6QmiOdouR72sq0FBXVx8yIJg5CBEICGdaLPkToiZosjS8sCqa7+XVDmojnR9mNOLXQ61kIxRfcVBkL6D/AjAGZhCABdPTlnF4PqA4HGxnfDwik6lgFFqS1kXr1zXVUuWnvU+pKI2TiUcjZkZRMW8E9HwSEtCKKOsGlgBUNKwijmvUcN5Fut+7qquJs5DVWvxEPtIVUIvp/vwuWsea8PrEYemW4gF/OShA/X+bkLnyKcieObTwg3soOavFIuEL6MSFxwG7bbzSosmWVVOwXUxO05NWqcgLkmPibL8p2doFxVOP+kr8AzHCiP1V303gCIkTWZH3+bdaQvTfBJIdyThwYkW6soTIgX/sQk0IlLgiU00H5V7JwrRBoiwvJhfwfVC/uT2J3FGeVS7ELlucO9UjU/8dRRNVgZv7ZRQvM7f6EiVK/uwrBG8GBDB2HTxKIYaD7O+Xw3+2jIasPOkFvGUNv/RVC+oazTXa2D4z4O3K2td165PtoDw8Rh9hpNOm7KZiDNGIIRJtzq9IV5CXPKPJ0Y0E9w7TGxK/Fc8nIqpt6oPxLUZN5gYB4KJXYfGOq/nrXrxjknmoP8dMh0B4UqzAh+wr89kZQLJsaQPBg2e+svAG8KB0aHLEf2ivG9yJ2ycLxgRK2LUXZptHOPFxY+2QM8Q6H7SZhL8vxvMizEA8ERn6wC0mGmNIbbGBTXnuJb0aTZBMMMo8/vFOpb/l3Z39iG3RZiySfZxWJqrKYDZXSTxmMpbZiTViZfthPfNHOBOqDGbjqco1j3bqQDk/cCX9tA2xhwWEZMKWOmPpQrJMQihaJxTKSqc9LVzsNl9K57eDdYWtM2SVEDsSFptWNOb3BDYcICVBid/uHHjuhsyeVIjuhk6ClalNl6iJWDP+Mzd1MYx2GUFeapWyjCMNfRn0m4B4E9SrXmfw9B5H3x6U2mdfPzQq1noucMUb5ErjHiLnY9+u09Q8NHw+oBUOZNsbfZyzrtFpaA2vBEz0gYxbhQOfFse6D7G7kGDv6G3/HKSuDFINPhehDnfUIJDa4NtzJak2Sh+bZIC9FOwt/ItPv+HI9rXEHvhCUDpKWhMTYJnyuipXy1BaR4NgTOJQe3L8eIlYnhK80bhHpSmCf2m3ezrBYrWUMBuLvVH272VJGKCquDqAS++iG9Yi9kDGCHjUgOAZE143BS90V883XBIA+T33IZTK9FodSrzJrymzdTb4H8Knj+9O3uvt0/zN6yLU99Hv6HgdB/7yZvoxSVZaDIWlxWOxq4WBgMuZ/Tm4FFvmAaZmh7Bf3cNNiSFnuWyd53p2VcONBOVwloRISK4JG4burAAdpsoddGedISe3gg8EBtrzvZ/ZQTo/x4InJTNybZFClEXD1lVbSkY+/NcG5wZo8LJbfBgQ7R/AUXY+XpEzv7NnKC8UwEatbYngFWLwPotJ2UssHK6XJ9iTKEHFugi9iRO6gdpDJpBWH8RzMYsgNLaAhfuxzgusa6QnWgxGbZ87NU+44AjVhOD4v7raW/MR3RcZJYPO5nn2401E+Rwdslk6vqVZRDwmcJpgV5ZJd4DNKO27Nvdey+NyJRNSA+f6IYAlLtcfWeOyjh8RV0G7tWj5gB8v41M1bbQg8ma68BFA8fFl/ohi1/mcwky0mo/2KnWpaEhUE5ExltLezHMQMzbmnXCwabJGAI8mpVqi/qS858xMYavKV27yMYn27wdUC5W9/W87sCAGhefTAbMF24gv/kWIPNMAKR3JLTJNINAyPlnXm49PenzuDi3JbSrkvNk9KamrJ7RBv5JCbvnkfm4JQ7KKFwUmUPz0b4Qqx7uxV5ZT20yEeUcCiavooAyM2pye2zz3e+sJSghnaDFGKetAoZefuevh6wozXICpxgaEI9lx7cs+Pr+mu9s+X4bwK3QHS+ZdotLVfwcKh89xbpu8fdxqO7FAm5v/AfY7pBEuxIp6W0vLPr00kZyZA0MFQnbNnOK63B/MfT5OX3B6+ARdxPvJSGjG0XF+4hYG6BTlALa3hsUoZE7qK7bh4h4pfIhDz8xceKU2R3nfdTYzts5WRtM03Y/E0GduEclSNM5RZBlUUkLBkO0X35QuOrly4+0hVw/Diqpl7vQiLa1ysBJFuGqm+w0VYwrbwjUVunjNJGo0R9HmgHfono0ytDjFXU3o8nza36Nefq4GMHlvsYHiAXieFxjaxmeZDdmj5oByYH4+haTpKf6l7LWZ0qJSH1+ds5i7j7Ms2IYxv2EgDSfmKqDx4ZSc8Kevz7oh50HEynVAdoPQ+Nqjp7e9bC8/k8QKxuK9xEd/mERJKOPTk8u0twXrOKZIA0aR6kd1yfoJBRhrlcwjjZUcw+dw+v5w+Tm599cyHqaAAtSVcEMG0c7vnLG4qXyOtlEJQz1JglvAedz1hbb8OAyxfFnsA4t9vlqSQBNy1GjxjK5+BbTDFU5dFMSTkWcBKrSEJYxYUaGbAyrJopr5RHHJ6NzFRa0on7jjLSPahI68KCYGoPbEqZQGJxroJfmDfa8h5nXOuJkjq93sA/JsaNSeiCryj30o+ui4lRY/Aymw0pWOwXwcbbgRfroyViCaPoHAVBeGMueveZ9HOQQ40heDdE8v5ySh1uQcayvoWCBDKKAqH0siV4vzH62ecZLhSwpfP9flUy9As9WlGTo8DlgDvrV3Lsv/5oX0fEhfGW30kqLcV84LHke4GQ/hfnO9Y5nNrSLda9jY0balzFKFzZyThqHZ5r/A6XHFe7CGFnA0QmmsC5SHe4HHYQZ/eyxZGZGx260ir+JMYL558ALbI3TJ1C+VZmTp/YqLMHFRCSWN3BHPsFVWRzWvPPjwYopbXnT7I83O0nMjrOPr0etx3w9JxOHmR+1GAxrvaie4M8MtH62GUxrQm5iQkKYjoQX0NqlvfHCve7l3QjBI0MyrXPefcW8+yhCN0W8ger9m9xu0QDB1YputHN2haHlepgzYjniJWuCkC15OT2+J+8pQlfO9tpWfrprFMyDNx5SYWPIZT2A49iV/PO/UAne5vUHZCM4vk+nF1Cxlgk0KBg8FKcly50olI4Hu7YhoB6v5gtMaOXn79oIf/7e+jEWEhSgmVlX0q5g74bwTFipA01LjfclAyNbDgyGbe2eVh39ZTiCT75ZMtTzD0wiWhHYVtKEvrJbr2rOXDAnaabLv+Z959kSAK2A3uXEdMr3BAZ8KAK3gA66HnWYleK7J0R0WVoqWfrCLEP5sPPuCV7kkWQwSyMVlZzu+Fd+Etp3tN2yxn2rQDXz0SoeaFKU5/BGrcZ5o0VE0pnvDj46Kl+I184KXV4rYgVygleJlx0RAek1kCYk1zvGiXvo0wVyFEB2Maak+7iii8K+uTxSp1tQxKD9Bsald5cXD4ZVUTMp+Ltw89NyWgAdEoAQRK8pIIa7xX/6ob+0YfbmFqLgn9M/595OLwtt1VqnlcAVOcQUfWS9Abu04z7PVvdKPW5DzZZ12YlzJOOwBfUf3XKRjikKSyqBcduoSBy/9WQkTWQzI4okJ5/Adm6uFKXqW9dYlkOrvXxCYnVngNCSepxLIgV/TEhYLzyKcABFAvRu/4MHPtubxNajqHnpslfCmt9h3SX12w1zksB4WZoEC88ketBYY7e59qTyjX9LIzoxaEtohny5aqBe058dbPARQNvD0MZMCUeSrXRXQqWoqLQdLTD2lTgsfbMhRy5h0utk7wr8yyiPGEGWDOeYMijoYtrcpD7RaYku4sSBU8udN4g5VD4eCc+0+UrTqVblxRLKbmKZbLRAd4UZJXeZkpCFRNYQM/E7DI2NLIB/NjRxG4Tx/VWk2hMSfzch7rHkLNV53cRkG8HpjMLZTj8fiRSQ8hkIwhwsIelgNg61PyIESrKILXJPyezmTqmeF6jZcdPpjVoY5gOXuDU35P4R7Mw1POFZSK7nLIpTZbeA9YV/TvWn6glwFGiAmXoyqZ3rcIz/2DGzvmpTcaN0Xhx96kmb5T4+w2D/V4Cjul8XP1DoBmhWECaKMbloE7P6SRedZ31m/lY6ps4Zwn4ve0zq74sTyv+MNDL2ybxqFm1VM19D1a+RCtCEAXa8JY9xmVkkPXVoPP4gz8H96+SXWEIad7SV9qtpw2Uo3HJVvPT6G8GoRZO+tbgu1XkKg/oS7Xo439xz57NBmdGFKV2wYGg0TUoroYbH5c3Vg6zE6ZUt2kq/EHHGGGPKSQztdzez6XFyCAP4fHoBP8mZp+Gpk9ljoeyGAPq1w7W8gx9UAv/awO3CwBwB1yD83zLntxNKtjsqv/1UKQLwsLIO9W842ROdhoxghuPq68oyddz8Hec4r9oIuv9GWw54p0//UXGMjGVR8VIHmiPy54chpOEUPftrdvGnyYLcj0P6ntQNv3P68tih6q472/205fGwb5hXvanNEXDeHKqIAAADQe5mhdAgP+zWFl8FAF3b7POqRTG7KQ6176K9zu531bdUwrZzl1/fDfbTOyhY2s6CdfjjC2nloueHEFnfuwnWsVT6+ogpOE4zj/9n9XYRHAsfFRfqUcZaWFPiBLLJUhA8IFMywws9mlz5UzovD3dRn/LoszqG4D8biS3oAnZVJMlEF2NG5LU5Rc8k7gAwHwMkSeUlJX5KmC5uVQRZ10zywrwwRlnVIDUfXwuWvpOdHv2CHrtuNGc/T24QMc/fBidxDKMuHIN6M4cyRX+C5UWqc/zmX/QpKvA7VZQwqZOBkw1rUu//faY+ciyhfUw8BAGBQ8LQkZrOXCnnFilrL6H9ikhKgLqGxt0bAD5f+VmvCUWLr55TaLjYqmTNSlFAaMh7nGApMw/cFrR0TUJRMAQhxDDGft4GFrTb4v+vncvuoa/rXmCe5a7GHajaQ0vtynIq+R5Lau+Ij9AXxRhrj1ZXkDGI9ASZs/ogvJuCUuEbL1uUV3UD3So+MOR8dL6JseofNmLaQU6Rl1pFPrkC6wAwHAOAWdvnJPFipzLQ3s7/mqL3HJf7NCjTn2k+MUFyCWy3pkZuRw6rIUl0GrqziQ1nYgMsElpwyqaWg4E4i/XhuekiH8VJBX1kJBwsCYz9xzgDjNetf0PuDxAMYuYw/gIX9Ia+3xYdzod/UmJHLoGC4CBCMpTkSQPpmY8ZsJ/2kr5pT2t9rUEB4Q75/oF15nxXroHvE2poAHxRQPqypY/G3irXHBNKevAzrO+0eNLg+nNeyojFbncxDE/ZNej/+IUuN+kbSEX8lFGf8XDILXUQic2/BJcaW9CxY2ukHL5kCUab2P2I18j/7sGypu4YjdhSWp6Q69wci9MlfuHXodeLWo3cboF5UfBV5jDOhjYwNnxtD88Ko0x4XSXYueSJw8H3VhWrq9GeA6c/vDF1hme91MerB5xtZ4+bUVdHGwqX+C7J88guK4nuf7yf0+PH+03E3WKx7otPGbob65HmGkrcxEHKb7FV1vEmkM4F4F2gUZBx/dj4pPWbXOu1qUF1ntmoP5TmxP5yldsFWDJVhblI+/k4yN8TqedUhas6Kvz8blWB+04y0BDIT6YOJlnYCWCXoTE8MlWiougj6FwyjOySZfRmfa/B0JO03eK8QEQvcXtG5MthQlTdUw+9dsN5OdrZ7O29ZVbEsW/vOw7FLIGQ8QAiMGV9NZsZR0jKihtL16c8SYAcXFWZlYG9rAtSpXghklWzMxpPC3oTIOq5Yw/XhxX3edD1DHqK9/B5CGnHj4F+Tf0qIq9KC6JwU/XQ+Iw+BXWG+koFvfe3Fwa5NjYPpKH7qGpAryzM1BBGvljhiQTY8uS1c6z62LkYEI3XSTLTfDSTRmwtGGGHln48w0mkNnkZontneSjrA9B+iRvBFoomGOkXfBbtTXp6oWgYe4zds8KjZLPz6CGv0oNndvjEmn1e8d2Lee7D+3leZnL2pYWgrbJyGxyX0DsgOSDrNanSDHKAvqK8QNoOsyUT7aCOzfH8QxpbZfjOg+29A4FqcS/IOl2rN71U9jzpzxaFaQOe2PLvsMpXpRQlMTf10eN2XDq+jV8aUDnyr82u6wguu0gZoRGoiiJv11n+7SKPd7cpyKwwplMhuApahs1Fp5MLSYXRkgqKDn5B4h8yqu9//sCltoHZM2EsgJ3EZgU27tQOPmZfNZnqw5UBwDGfwDu4AhXsgA30RLyYcpgNwMlKIEOoBgHClY1E4L9z4QS3P2HZWsTm/p9grMBfeDhNkIlJveTrr1c3txHCsiPW36UU6SNQTfTqlTTCfeyTDhq4+2Uzw5ineKdnZ++1aG7PvhQ9Ovxl9xzl0QtyYMiZmT3M72ZbRKYDRQ5NTPFWWNgfR0F3b5RFGl+SWCbfGm/IXAlrjLPGmymm31c9NtWgG8Ae5nR5pe1dvXlpG42zFqrXNLRmyU7IAI/e0Ar0xKIH8Be5vAi8FtoxHhRfLYTJR5HwLONsyfu0uCO7Xuw3vi8rN1vmqo0rOwZlT3PT7T4nfRxJc77kWFA6SBbflu+RGQQYGGZsbCPrYnmKWPAdj7/3UupKfxWEjw2kUvqOkTqwtfKybgRV/2ns1LJVX95CmSJXhPzZvipZDx5hs6JMMP7nOJOstTQbIFRc5tEIVNrOnJUHykj/U22AWN7S8U8z+JBpaeQ9C1T2Ti/HYx7N/rBXPBnIqI+XlWXmXWd+B/KYfq79zQ/77OjHhQ3pzU+3AkSqe3Zflp/yalq6gGye4wilfwFaQgMscu8gndgY1HEK++kQ0xfBxuSSm/04shpUKIONlyDkWkHGhg/a/9oJpN0x22nyfSMvibk274nmJN7bkiZwS22xEteEhvNl7csZ50tnO11XQkW9QoA72IHh+osn/yX4d2gmF7svC36lBH9gFT4oZG2TTKZhRddIhOXOSJRRhRbSNAYVR7guvLPg1TzzgPXUPEiffDZLmSlGpEo12IeETUVq+OLbAdiF/LjD/rS6fukk1mDiOQvj9eBXzAdezRib9pZ23+P000mMi9lN7xXM3d3J2GJDpyJ1OinZadPGu3XBpy1N+denhI937enFJRbuLTi/eygVCDUWj3kuXVn0S5vNz4fs+V73SmZP2L4qZHo5692M+fYXELLSz9X2NesCXty0Q6CGypZCKWs1qxMU1YmrLiOOEPesZToavn7/LxPzfaNuD7tKjkx5k0/Olo71iMz9+HmNXuCwmNWoKYUCwrgqWaVVEymyjLp/DdsdHmsbf4aSepMFiMvMVHg9S8KmKZLb/5oGqyi7T8sMroLN9QEovrz8MW3Y7q0FmLGMFGUFTHu5sZn/0b837tSE87NVMKRyTETCgNjl4XqYHNbN4hegHpOYQAhqAJvojdFHoa2AH0QqlO8hMCO1DdKu2IvqMzfcNTX3m3AqhqvC63PJUPVsvBycjcwQLFRs6IB9oAbKltAujEHQXC5icLWmiq53AMR1H6e9OcT0gmpoP8qV7agpEMu0GAiUCgnNN0P0IsWkrbJlRivrxoOAsRLRLphkK54zCPUPiw0kSbG5UQhl9o1Tsc7i/3jhgBYvTLARCWJE2ABnOrNLaV9PDPqYsNBYMzLYKe6qBM/lPA//DNCbWN+zaXgQRYQIN4c1MXINmoVknOvHTFBsBCija0ezaVnor21/XcuSgVI3w2UTHgYfzyUs4fwJHyf6MA/AVaYrWJWVwpsVoA9Jitlv/vHOdsJ/krWUQxrtZH3ukTCbhhJrrEtoYcHB8vwGxlggp4wesof8ALIzJGeuJEGNBBOFKM22Js7UM32rhoH7I27fd2jvhAU8E3rvG6yQZ7L+66IFnjIv91WKVy6TK1gUtOxZZHRQFW1jZgp5kK9AlCWDyh6sbDbsjakcTkMeQ02m8dBsT0oLYJA3Gd6aYa2FiYcAAvmnsopcUcGo3weDbUVrNZanurlCoIb8YWEyvHp07LGyBSOZ2xNHDZCKh/qo6oRtsCEpZwRWK1BtsL0MEy43/bkmw7U6+sneTMkYfeuo6I5+mF2zO7YTNDwgqTlK6tyb/pALjtOyaUhgQWzGYU98A20axzYQM/2d9ywc8C1WzOI1AB4KFSWPiySaZb2hLi4U6nniGnqIz9+SAl/owwpQNb00X1Li/7EXiIzO/ZvKKmxNHKjBNLBu87upC978qkjCn/7zk7RunucQqRqlqIyjAq8qss32zHZwxSQvSalqa1R5o2N25i+Q7EJ8G4Ina8GK5zByL8liOpC7eGmfauKNs/744pIWxUgQc2h5OJpnGUJ//wHr+cm1o/+PYdjoMtluc1TG9ZW2Fgx+8sxpzytDYFL4dceLQfyz0Hi4pDoVOcAbHkCNgb0Dd0rhM/B+TdMfSqtl9S3ORN9peP3VudGp3sbxRdwb8Q7zAtunaAuGXj9fcUA+lXLvOD5tiQc2j9mW+bIOQyKQ1kYIuYHIcywS7KPuUAO7gGn3UC3kwTlIu93bXV5v6+kvHollFJTID7alns2A2epsiylBJXPM/fPst8mMAgX0spP4S3vMi4T0gv1TQMc8Nn7cTM/JuLC4Sl11lQ+ZQDtIsKxrxnlFt+lCV4bx3a1aA3LPDwaYikr0LZF36GM56rFmv81fzn5eW1tUvkWUga9iMjDUSnALVngp5fQEOnqhjDewH4/HPHDuQ9piEpWfNFmhsiD4sBfjNsVM22Rpwt15SJ4vp6Rr/ftEuyZ1O0pMeujjihALLotJSY8XqQF4OBH1XBYyR0vzMkYM/M9i6xsM8XTeMhPB8Ioq6dvmOeYAaLmwsRbBF7/EuCemGI/yEugfUf5pQ/gjM1kes2FvtHB6vqu5Dvzaa5QqAA5rlg7W157LBHqZAWE9PDUcmRFarESj+XnRXdc3f7JpS1ci05jBkdIsx/HrpSsD5kN0Jar5PI6jwBZSMMGMf5lGsymeBlCYd2L5U2wX7LgN3ivSVjMwBj+ND3AF3EKFAKHpz7hj4NyJFGkZipKEBlfiEPnSWx25K23MtlzdwyFfXfHOBw0dZP6chcfQ7jXcwftBXcFtHVKcAi8MSJ3d0QRytG8ZLcA1fSHk3iGK3GaFL3SQf2SwhWwhSTtgRbt7zZRVaiqLELoJE/ZRiZxv7LEO/QtsmTZdQSAxeLLx89e/T9dGL3HPdNETi2f239mw1D+xOzWGIcQuYBediXxsjFhx8lGEeu9n8+jyKBRm7g7r/hCBWfFCEkqaZ41go19eJ4VGgJALvPNL/ZQi4lSzgOq02DiYHzjJzw6booZ/PXIDy/Z0Blz1yQybBCs9iHo8Itx6Rvahhyz3OqQPenjElgBiy9TAAABazShNBAoA5icLrbjcoSUOMrpLELSREI+NDq+ECVZutsORY2Pg4qZGGMhunuPSyU789eebWGEMgd011RfuDtmyLLMb4s+acSgEwzRcYNkf+HC94iQFgmGrVdxKZ2vUYdzJx61fSoZIkQh2W/jS63Qp0ltLk87H6UYtDjd3LcmeDQyhe+bE9k21cn/7KExlWmlQMVntGUqC/ltqw99AuJfrT12f000caKrE91I8mPcW5de831Sn45qEEsQaPx0YNeDZEemaDUBhz7Np8cZ9NzliSQuOgYAvSNKpGdM7Y/4nTeAeGaX3m6o5Gy4Y0fHPN55rKnQUonDJAJ6et1/eVpzVuMiXqJGokWI52qmCLWnEoPshPjwcreFV4hi0u1tAT6nWeAW7U3Ok/OWNztXVNBvWW2oZ4+C2M9iDL0GZ/wvbvXXHH7q6DAiQ/IGtBauWzGl4TW1iR74tvWCwBYOKda8evwuInjMYV3bqmXXw3OZDfhJS1pfAgzh0GlxEuaxZpjth8kcM57gGmkhX+ESgwpzNkamF71rjqvBcw6cyxrJwYfiZTVko+OjIVEdGLrMmI/1O28c88BahDldVcL7VqMk8gB1pQdSDQImutyFsUNtEd6Ly3RVtzaYsWwqA2YKB/jxTK5CxI3OyBAP8xFxdG9yL0vqJ3pq2cyYWqJI+FzMNIq8B0ifBH4bLpYi603YHdMf2TArX7gvMlFAYVjz05AXnD918RrsEn7KIDmeLTRWQzuSKQxX0cKz3Du14kt/Mtf56acBUv+F4R8itmdtVwz7aDE8kKTDJnOEzmzWZSjTxjHix0cN9CcuapwY/tP9gnujdk9U0Rh3FVfu5aM3p3OVxs9/dp/bb9woXb54gLRfMxhI1jel2tNzozR3J1XAwSGKoXmWBo6J1L+BcVUMgsJXTc+yLcIhYY/t+rqy2GmtHO6niNUf2nmLq0wzj+dkX/v/NAAAA1oCEg426626ZJquhXDT+qB00LjeGpHSGirup0dTJLA7jA4tibcYEeGx7xkWRvbccpILELBjM35YWmCIswwa/Sv9viAcrrhSu3Vx98WDTjAT4sjzPmYdX1x4j8vzUtK3SC10sLc/+x/AtsBiK6kimNU4IyskVJNFfo4y0wg0M2BKYfRG1LqEKK+XrjU3Td1GlS2YMUlug+e+L7FlbpEH3ABY9qd9tUe3fm9IRXU0096vv/xijhpJEybxVioTSxqOz+4wW/+hr6txeF7GWO9pv3RZXFShtPCFALjXwiH0BO6+PK2+QxRnXcTTfvfEXaWKGgNrdjN/ZzEZTyuXuLTvBs/Z9TjUxft4eoL/1qpC48A3Z0k+zqpiwPcW3bSeUZs6yVcOBNM13RMKkzv+ApsP9xy/Ubr4/wnMLpxGlzG/sRCD0ROXNPgbj/tkGLyKoJ4S4PPtyDyZ9uMTCB/s2ZmhYSl6yG2W3cjG8MvAA3hfykwrI/wk1Wlu9KdBCdkM6HyT4AYmd7U/qMiJsiKUyjQJiC+Ok8iYCFnovJDER2cWme35IKgtV2XAg8UZW899tykNm2dgTAAAAAAAA==\"></div>\n    <div class=\"judul\">Sulung Connect</div>\n    <div class=\"sub\" id=\"kosongTeks\">Menyiapkan layar TV...</div>\n    <div class=\"rinci\" id=\"kosongRinci\"></div>\n  </div>\n  <div class=\"lapis\" id=\"lapA\"><img id=\"imgA\" alt=\"\"><div class=\"nama\" id=\"namaA\"></div><div class=\"khusus-isi\" id=\"kartuA\"></div></div>\n  <div class=\"lapis\" id=\"lapB\"><img id=\"imgB\" alt=\"\"><div class=\"nama\" id=\"namaB\"></div><div class=\"khusus-isi\" id=\"kartuB\"></div></div>\n\n  <div id=\"panel\" class=\"sembunyi\">\n    <div class=\"kepala\">\n      <div><div class=\"t1\">Layar TV</div><div class=\"t2\">Sulung Connect</div></div>\n      <div class=\"pil\" id=\"pilStatus\">Memeriksa...</div>\n    </div>\n    <div class=\"badan\">\n      <div id=\"isi\"></div>\n      <div class=\"tombol\">\n        <button type=\"button\" class=\"sekunder\" data-aksi=\"kiri\">&#8634; Putar kiri</button>\n        <button type=\"button\" class=\"sekunder\" data-aksi=\"kanan\">&#8635; Putar kanan</button>\n        <button type=\"button\" class=\"emas\" data-aksi=\"penuh\">Layar penuh</button>\n        <button type=\"button\" class=\"sekunder\" data-aksi=\"reload\">Muat ulang</button>\n        <button type=\"button\" class=\"utama\" data-aksi=\"tutup\">Sembunyikan</button>\n      </div>\n      <div class=\"bantu\">Remote: <span class=\"kbd\">OK</span> layar penuh &middot; <span class=\"kbd\">&#9664;</span> putar kiri &middot; <span class=\"kbd\">&#9654;</span> putar kanan &middot; <span class=\"kbd\">&#9650;</span> normal &middot; <span class=\"kbd\">&#9660;</span> tampil/sembunyikan panel</div>\n    </div>\n  </div>\n</div>";
  (function () {
    var g = document.createElement('style'); g.appendChild(document.createTextNode(GAYA_TEKS)); document.head.appendChild(g);
    document.body.innerHTML = MARKUP_TEKS;
    if (!POTRET) {                      // VIP: tidak ada pemutaran, sesuaikan tombol dan petunjuk
      var b = document.querySelectorAll('[data-aksi="kiri"], [data-aksi="kanan"]');
      for (var i = 0; i < b.length; i++) b[i].parentNode.removeChild(b[i]);
      var bt = document.querySelector('#panel .bantu');
      if (bt) bt.innerHTML = 'Remote: <span class="kbd">OK</span> layar penuh &middot; <span class="kbd">&#9660;</span> tampil/sembunyikan panel';
    }
    try { if ('caches' in window) caches.delete('tv-gambar-v1'); } catch (e) {}      // buang cache lama versi sebelumnya
  })();
  /* ---------- Alamat layanan (Apps Script, tanpa login) ---------- */
  var API = qs('api') || 'https://script.google.com/macros/s/AKfycbzLW6Kb7iIrichbBQF-6iVYvJxtaS8GUx3IZq6b6HgzjlBSWRQ1Q3wwEe2sj5d51L-_FQ/exec';
  var NAMA_CACHE = 'tv-gambar-v2-' + LAYAR;

  /* ---------- Penyimpanan aman (tetap jalan walau diblokir) ---------- */
  var K_ROT = 'tvRot', K_LOG = 'tvLog_' + LAYAR, K_MULAI = 'tvMulai_' + LAYAR, K_RELOAD = 'tvReload_' + LAYAR, K_DAFTAR = 'tvDaftar_' + LAYAR, K_JAGA = 'tvJaga';
  function baca(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function simpan(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function qs(nama) { var m = location.search.match(new RegExp('[?&]' + nama + '=([^&]*)')); return m ? decodeURIComponent(m[1]) : ''; }
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function jamTeks(d) { return p2(d.getHours()) + ':' + p2(d.getMinutes()) + ':' + p2(d.getSeconds()); }
  function durasi(ms) { var s = Math.max(0, Math.floor(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return p2(h) + ':' + p2(m) + ':' + p2(s % 60); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var DETIK_AMBIL = parseInt(qs('ambil'), 10) || 30;       // seberapa sering memeriksa daftar tayang
  var DETIK_PING = parseInt(qs('ping'), 10) || 30;
  var DETIK_FPS = parseInt(qs('fps'), 10) || 120;
  var mulaiHalaman = Date.now();
  var stage = document.getElementById('stage');
  var st = { video: '-', jumlahJadwal: 0, jumlahBelum: 0, sw: 0, sh: 0, wake: '-', pingMs: null, pingOk: 0, pingGagal: 0, pingBeruntun: 0, fps: null, fpsWaktu: 0,
             listOk: 0, listGagal: 0, listBeruntun: 0, listErr: '', versi: '-', sumber: '-', jumlahDaftar: 0, jumlahSiap: 0, diputar: '-' };

  /* ---------- Catatan kejadian (bertahan walau dimuat ulang) ---------- */
  function bacaLog() { try { return JSON.parse(baca(K_LOG) || '[]'); } catch (e) { return []; } }
  function catat(teks) {
    var a = bacaLog(); a.push([Date.now(), teks]); if (a.length > 60) a = a.slice(a.length - 60);
    simpan(K_LOG, JSON.stringify(a));
    if (typeof gambar === 'function') gambar();
  }

  /* ---------- Putar & ukuran panggung ---------- */
  var rot = POTRET ? 90 : 0;
  (function () {
    if (!POTRET) return;                                  // VIP: landscape tetap
    var p = qs('putar');
    if (p) { rot = p === 'kiri' ? 270 : 90; simpan(K_ROT, String(rot)); }
    else { var t = parseInt(baca(K_ROT), 10); rot = (t === 270) ? 270 : 90; }       // bawaan: putar kanan (90°)
  })();
  function layout() {
    var W = window.innerWidth || document.documentElement.clientWidth, H = window.innerHeight || document.documentElement.clientHeight;
    var sw = rot === 0 ? W : H, sh = rot === 0 ? H : W;
    stage.style.width = sw + 'px'; stage.style.height = sh + 'px';
    stage.style.marginLeft = (-sw / 2) + 'px'; stage.style.marginTop = (-sh / 2) + 'px';
    stage.style.webkitTransform = stage.style.transform = 'rotate(' + rot + 'deg)';
    stage.style.setProperty('--u', (Math.min(sw, sh) / 100) + 'px');
    st.sw = sw; st.sh = sh;
  }
  function setRot(r) { if (!POTRET || (r !== 90 && r !== 270)) return; rot = r; simpan(K_ROT, String(r)); layout(); catat('Putar: ' + (r === 90 ? 'kanan 90\u00B0' : 'kiri 90\u00B0')); }
  window.addEventListener('resize', layout);

  /* ==========================================================
     DAFTAR TAYANG: ambil dari layanan, simpan gambar di browser (Cache Storage)
     ========================================================== */
  var urlGambar = {};                  // id slide -> blob URL siap tampil
  var daftarServer = [];               // [{id, detik}] sesuai server
  var playlist = [];                   // slide yang gambarnya siap
  var sedangSinkron = false, perluSinkronLagi = false, jid = 0;

  var RATA_SAH = { kiri: 1, tengah: 1, kanan: 1 };
  function jamAman(v) { var m = String(v === undefined || v === null ? '' : v).match(/^([01]?\d|2[0-3]):([0-5]\d)$/); return m ? (m[1].length === 1 ? '0' : '') + m[1] + ':' + m[2] : ''; }
  function angkaAman(v, mn, mx, awal) { var n = Number(v); return (v === '' || v === null || v === undefined || !isFinite(n)) ? awal : Math.max(mn, Math.min(mx, n)); }
  function slideAman(x) {
    if (!x || typeof x.id !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(x.id)) return null;
    var d = Math.round(Number(x.detik)); if (isNaN(d)) d = 10;
    var o = { id: x.id, detik: Math.max(3, Math.min(120, d)), jenis: (x.jenis === 'greeting' || x.jenis === 'ultah' || x.jenis === 'reservasi') ? x.jenis : 'promo', ver: /^[A-Za-z0-9]{1,16}$/.test(String(x.ver || '')) ? String(x.ver) : '', hari: null, mulai: jamAman(x.mulai), selesai: jamAman(x.selesai) };
    if (!o.mulai || !o.selesai) { o.mulai = ''; o.selesai = ''; }                          // jam harus lengkap berpasangan, kalau tidak = sepanjang hari
    if (x.hari && x.hari.length !== undefined && typeof x.hari !== 'string') {
      var h = []; for (var i = 0; i < x.hari.length; i++) { var n = Number(x.hari[i]); if (n >= 1 && n <= 7 && Math.floor(n) === n && h.indexOf(n) === -1) h.push(n); }
      h.sort(function (p, q) { return p - q; }); if (h.length && h.length < 7) o.hari = h;
    }
    if (o.jenis === 'ultah' || o.jenis === 'reservasi') {                                   // slide otomatis: hanya nama depan, tanggal, jam, venue
      o.tgl = /^\d{4}-\d{2}-\d{2}$/.test(String(x.tgl || '')) ? String(x.tgl) : '';
      o.tglTeks = bersihTeks(x.tglTeks, 40);
      if (o.jenis === 'ultah') {
        o.nama = []; for (var a = 0; a < (x.nama || []).length && o.nama.length < 12; a++) { var nn = bersihTeks(x.nama[a], 24).toUpperCase(); if (nn) o.nama.push(nn); }
        o.ucapan = bersihUcapan(x.ucapan);
      } else {
        o.item = []; for (var b = 0; b < (x.item || []).length && o.item.length < 40; b++) {
          var it = x.item[b] || {}, mm = Math.round(Number(it.m)), vv = bersihTeks(it.v, 40).toUpperCase();
          if (isFinite(mm) && mm >= 0 && mm <= 1439) o.item.push({ m: mm, j: p2(Math.floor(mm / 60)) + '.' + p2(mm % 60), v: vv || '-' });
        }
        o.item.sort(function (p, q) { return p.m - q.m; });
      }
    }
    if (o.jenis === 'greeting') {
      o.nama = bersihNama(x.nama);
      o.x = angkaAman(x.x, 0, 100, 50); o.y = angkaAman(x.y, 0, 100, 30); o.ukuran = angkaAman(x.ukuran, 1.5, 15, 4.4);
      o.rata = RATA_SAH[x.rata] === 1 ? x.rata : 'tengah';
      var b = Number(x.berlaku); o.berlaku = (isFinite(b) && b > 0) ? b : 0;
    }
    return o;
  }
  /** Nama tamu boleh beberapa baris (maksimal 4): tiap baris dirapikan, baris kosong dibuang, paling banyak 100 huruf. */
  function bersihTeks(v, maks) { return String(v === undefined || v === null ? '' : v).replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maks); }
  /** Ucapan ulang tahun: maksimal 6 baris & 300 huruf; baris baru dipertahankan. */
  function bersihUcapan(v) {
    var b = String(v === undefined || v === null ? '' : v).replace(/\r\n?|\u2028|\u2029/g, '\n').split('\n'), o = [];
    for (var i = 0; i < b.length && o.length < 6; i++) { var t = b[i].replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim(); if (t) o.push(t); }
    return o.join('\n').slice(0, 300);
  }
  function bersihNama(v) {
    var b = String(v === undefined || v === null ? '' : v).replace(/\r\n?|\u2028|\u2029/g, '\n').split('\n'), o = [];
    for (var i = 0; i < b.length && o.length < 4; i++) { var t = b[i].replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim(); if (t) o.push(t); }
    return o.join('\n').slice(0, 100);
  }
  function bersihkanDaftar(arr) { var o = []; for (var i = 0; i < (arr || []).length && o.length < 20; i++) { var s = slideAman(arr[i]); if (s) o.push(s); } return o; }
  /* Kunci gambar = id + revisi (ver). Ganti gambar latar Greeting = ver baru = TV mengunduh yang baru, bukan memakai simpanan lama. */
  function kunciSlide(s) { return s.id + (s.ver ? '~' + s.ver : ''); }
  function kunciCache(k) { return '/tv-gambar/' + encodeURIComponent(k); }

  /* ---------- Jam server (WIB) & jadwal ----------
     TV menghitung selisih jamnya terhadap jam server tiap kali mengambil daftar, lalu menyaring jadwal SENDIRI (tetap benar saat internet putus). */
  var offsetWaktu = 0;
  var NAMA_HARI = ['', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  function wibSekarang() {
    var ms = Date.now() + offsetWaktu, w = new Date(ms + 7 * 3600000), dj = w.getUTCDay();
    return { ms: ms, hari: dj === 0 ? 7 : dj, menit: w.getUTCHours() * 60 + w.getUTCMinutes(), teks: p2(w.getUTCHours()) + ':' + p2(w.getUTCMinutes()),
             tgl: w.getUTCFullYear() + '-' + p2(w.getUTCMonth() + 1) + '-' + p2(w.getUTCDate()) };
  }
  function jamKeMenit(t) { var m = /^(\d{2}):(\d{2})$/.exec(t || ''); return m ? (+m[1]) * 60 + (+m[2]) : null; }
  /** Hari: 1=Senin..7=Minggu (null = setiap hari). Jam selesai < mulai = melewati tengah malam, dihitung ke hari mulainya. */
  function jadwalAktif(s, w) {
    var ada = function (d) { return !s.hari || s.hari.indexOf(d) !== -1; };
    var m = jamKeMenit(s.mulai), e = jamKeMenit(s.selesai);
    if (m === null || e === null || m === e) return ada(w.hari);
    if (m < e) return ada(w.hari) && w.menit >= m && w.menit < e;
    var kemarin = w.hari === 1 ? 7 : w.hari - 1;
    return (ada(w.hari) && w.menit >= m) || (ada(kemarin) && w.menit < e);
  }

  /* JSONP: cadangan kalau fetch lintas-situs diblokir browser TV */
  function jsonp(url, batas) {
    return new Promise(function (res, rej) {
      var nm = 'tvCb' + (++jid) + '_' + Date.now(), s = document.createElement('script'), terpanggil = false;
      var t = setTimeout(function () { bersih(); rej(new Error('waktu habis')); }, batas);
      function bersih() { clearTimeout(t); try { delete window[nm]; } catch (e) { window[nm] = undefined; } if (s.parentNode) s.parentNode.removeChild(s); }
      window[nm] = function (d) { terpanggil = true; bersih(); res(d); };
      s.onerror = function () { bersih(); rej(new Error('skrip gagal dimuat')); };
      s.onload = function () { setTimeout(function () { if (!terpanggil) { bersih(); rej(new Error('jawaban bukan JSONP (deployment lama / akses?)')); } }, 1500); };
      s.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + nm;
      document.head.appendChild(s);
    });
  }
  function lewatFetch(url) {
    var ac = ('AbortController' in window) ? new AbortController() : null;
    var to = setTimeout(function () { if (ac) ac.abort(); }, 12000);
    return fetch(url, { cache: 'no-store', signal: ac ? ac.signal : undefined }).then(function (r) {
      clearTimeout(to); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text();
    }, function (e) { clearTimeout(to); throw e; }).then(function (t) {
      try { return JSON.parse(t); } catch (e) { throw new Error('jawaban bukan JSON (deployment lama / akses?)'); }
    });
  }
  function pesan(e) { return String((e && e.message) || e || 'galat'); }
  function ambilJson(params) {
    var url = API + (API.indexOf('?') > -1 ? '&' : '?') + params;
    return lewatFetch(url).then(function (d) { st.sumber = 'fetch'; return d; }, function (e1) {
      return jsonp(url, 15000).then(function (d) { st.sumber = 'jsonp'; return d; }, function (e2) { throw new Error(pesan(e2) + ' | fetch: ' + pesan(e1)); });
    });
  }

  function base64KeBlob(b64, mime) {
    var bin = atob(b64), a = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
    return new Blob([a], { type: mime || 'image/jpeg' });
  }
  function dariCache(k) {
    if (!('caches' in window)) return Promise.resolve(null);
    return caches.open(NAMA_CACHE).then(function (c) { return c.match(kunciCache(k)); })
      .then(function (r) { return r ? r.blob() : null; })
      .then(function (b) { return b ? URL.createObjectURL(b) : null; })
      .catch(function () { return null; });
  }
  function keCache(k, blob) {
    if (!('caches' in window)) return Promise.resolve();
    return caches.open(NAMA_CACHE).then(function (c) { return c.put(kunciCache(k), new Response(blob, { headers: { 'Content-Type': blob.type || 'image/jpeg' } })); }).catch(function () {});
  }
  function unduhGambar(slide) {
    var k = kunciSlide(slide);
    return ambilJson('tv=gambar&id=' + encodeURIComponent(slide.id) + (slide.ver ? '&ver=' + encodeURIComponent(slide.ver) : '')).then(function (d) {
      if (!d || !d.ok || !d.data) throw new Error('gambar tidak tersedia');
      var blob = base64KeBlob(d.data, d.mime);
      return keCache(k, blob).then(function () { urlGambar[k] = URL.createObjectURL(blob); return true; });
    });
  }
  /* Gambar siap? Ada di memori -> ada di Cache Storage -> unduh (kalau boleh). */
  function khusus(s) { return !!s && (s.jenis === 'ultah' || s.jenis === 'reservasi'); }
  function sidik(teks) { var h = 5381; for (var i = 0; i < teks.length; i++) h = ((h * 33) ^ teks.charCodeAt(i)) >>> 0; return h.toString(36); }
  /** Slide otomatis -> halaman-halaman (ulang tahun 4 nama/halaman, reservasi 6 baris/halaman). Data hari lain & reservasi lewat 3 jam tidak ditampilkan. */
  function halamanKhusus(s, w) {
    if (!s.tgl || s.tgl !== w.tgl) return [];                                     // data kemarin tidak pernah ditampilkan (TV sempat offline lewat tengah malam)
    var isi = [], per = s.jenis === 'ultah' ? 4 : 6, i;
    if (s.jenis === 'ultah') { if (!s.nama.length) return []; isi = s.nama; }
    else { isi = s.item.filter(function (x) { return w.menit < x.m + 180; }); if (!isi.length) return []; }
    var n = Math.ceil(isi.length / per), out = [];
    for (i = 0; i < n; i++) {
      var bagian = isi.slice(i * per, (i + 1) * per), e = { id: s.id + '#' + (i + 1), induk: s.id, jenis: s.jenis, detik: s.detik, hari: s.hari, mulai: s.mulai, selesai: s.selesai,
        tglTeks: s.tglTeks, ucapan: s.ucapan || '', halaman: i + 1, jumlahHalaman: n };
      if (s.jenis === 'ultah') e.nama = bagian; else e.item = bagian;
      e.ver = sidik(JSON.stringify([bagian, e.ucapan, e.tglTeks, i, n]));
      out.push(e);
    }
    return out;
  }
  function pastikanGambar(slide, bolehUnduh) {
    if (khusus(slide)) return Promise.resolve(true);                              // slide otomatis tanpa gambar
    var k = kunciSlide(slide);
    if (urlGambar[k]) return Promise.resolve(true);
    return dariCache(k).then(function (url) {
      if (url) { urlGambar[k] = url; return true; }
      if (!bolehUnduh) return false;
      return unduhGambar(slide).then(function () { return true; }, function (e) { catat('Gambar ' + slide.id + ' gagal diunduh: ' + String((e && e.message) || e).slice(0, 40)); return false; });
    });
  }
  function bangunPlaylist() {
    var w = wibSekarang();
    var siap = [], belum = 0;
    daftarServer.forEach(function (s) {
      if (khusus(s)) { var hl = halamanKhusus(s, w); for (var q = 0; q < hl.length; q++) siap.push(hl[q]); }
      else if (urlGambar[kunciSlide(s)]) siap.push(s); else belum++;
    });
    playlist = siap.filter(function (s) { return jadwalAktif(s, w); });
    st.jumlahDaftar = daftarServer.length; st.jumlahSiap = siap.length; st.jumlahJadwal = playlist.length; st.jumlahBelum = belum;
    if (berjalan && idAktif !== null) {
      var a = null; for (var i = 0; i < playlist.length; i++) if (playlist[i].id === idAktif) { a = playlist[i]; break; }
      if (!a) { clearTimeout(timerPutar); langkah(); return; }                                   // yang sedang tampil sudah di luar jadwal / dihapus: ganti sekarang
      if (kunciAktif !== kunciSlide(a)) { clearTimeout(timerPutar); idAktif = null; langkah(); return; }   // gambar latar diganti: tampilkan yang baru
      if (a.jenis === 'greeting') isiNama(lapisAktif === 'A' ? namaA : namaB, a);                // nama/posisi berubah: terapkan segera, tanpa menunggu giliran
    }
    mulaiPutar();
  }
  function bersihkanGambarLama() {
    var ada = {}; daftarServer.forEach(function (s) { ada[kunciSlide(s)] = 1; });
    Object.keys(urlGambar).forEach(function (k) { if (!ada[k]) { try { URL.revokeObjectURL(urlGambar[k]); } catch (e) {} delete urlGambar[k]; } });
    if ('caches' in window) {
      caches.open(NAMA_CACHE).then(function (c) {
        return c.keys().then(function (ks) { return Promise.all(ks.map(function (rq) {
          var k = decodeURIComponent(String(rq.url).replace(/^.*\/tv-gambar\//, ''));
          return ada[k] ? null : c.delete(rq);
        })); });
      }).catch(function () {});
    }
  }
  /* Sinkron: pastikan semua gambar daftar baru ada, lalu tukar playlist */
  function sinkron(slides) {
    daftarServer = slides;
    if (sedangSinkron) { perluSinkronLagi = true; return Promise.resolve(); }
    sedangSinkron = true;
    var rantai = Promise.resolve();
    slides.forEach(function (s) { rantai = rantai.then(function () { return pastikanGambar(s, true).then(function () { bangunPlaylist(); }); }); });
    return rantai.then(function () { bangunPlaylist(); bersihkanGambarLama(); }).then(function () {
      sedangSinkron = false;
      if (perluSinkronLagi) { perluSinkronLagi = false; return sinkron(daftarServer); }
    }, function (e) { sedangSinkron = false; throw e; });
  }
  function ambilDaftar() {
    return ambilJson('tv=daftar&layar=' + LAYAR + '&t=' + Date.now()).then(function (d) {
      if (!d || !d.ok || !Array.isArray(d.slides)) throw new Error('jawaban tidak valid');
      var baru = bersihkanDaftar(d.slides);
      if (st.listBeruntun > 0) catat('Daftar tayang pulih (gagal ' + st.listBeruntun + 'x berturut-turut)');
      st.listOk = Date.now(); st.listBeruntun = 0; st.listErr = '';
      var sw = Number(d.waktu); if (isFinite(sw) && sw > 1e12) offsetWaktu = sw - Date.now();            // jam server (epoch ms) -> selisih terhadap jam TV
      var berubah = String(d.versi) !== st.versi;
      st.versi = String(d.versi);
      if (berubah) catat('Daftar tayang diperbarui: ' + baru.length + ' slide');
      simpan(K_DAFTAR, JSON.stringify({ versi: st.versi, slides: baru, waktu: Date.now(), offset: offsetWaktu }));
      return sinkron(baru);
    }).catch(function (e) {
      st.listGagal++; st.listBeruntun++; st.listErr = pesan(e).slice(0, 120);
      if (st.listBeruntun === 1) catat('Daftar gagal diambil: ' + st.listErr);
    });
  }

  /* ---------- Putar slide (dua lapis, memudar) ---------- */
  var lapA = document.getElementById('lapA'), lapB = document.getElementById('lapB'), imgA = document.getElementById('imgA'), imgB = document.getElementById('imgB');
  var kosong = document.getElementById('kosong'), kosongTeks = document.getElementById('kosongTeks');
  var namaA = document.getElementById('namaA'), namaB = document.getElementById('namaB'), kartuA = document.getElementById('kartuA'), kartuB = document.getElementById('kartuB');
  function el_(tag, kelas, teks) { var n = document.createElement(tag); if (kelas) n.className = kelas; if (teks !== undefined) n.textContent = teks; return n; }
  /** Bangun kartu slide otomatis (semua isi lewat textContent, tidak ada HTML dari server). */
  function bangunKartu(k, s) {
    k.innerHTML = '';
    var logo = el_('div', 'kh-logo'), li = document.createElement('img'); li.alt = ''; li.src = document.getElementById('logo').src; logo.appendChild(li); k.appendChild(logo);
    k.appendChild(el_('div', 'kh-judul', s.jenis === 'ultah' ? 'Selamat Ulang Tahun' : 'Reservasi Hari Ini'));
    k.appendChild(el_('div', 'kh-garis'));
    k.appendChild(el_('div', 'kh-tanggal', s.tglTeks));
    if (s.jenis === 'reservasi') k.appendChild(el_('div', 'kh-catatan', 'Waktu dalam WIB'));
    var tengah = el_('div', 'kh-tengah'), i;
    if (s.jenis === 'ultah') for (i = 0; i < s.nama.length; i++) tengah.appendChild(el_('div', 'kh-nama', s.nama[i]));
    else for (i = 0; i < s.item.length; i++) { var b = el_('div', 'kh-rsv'); b.appendChild(el_('div', 'kh-jam', s.item[i].j)); b.appendChild(el_('div', 'kh-venue', s.item[i].v)); tengah.appendChild(b); }
    k.appendChild(tengah);
    if (s.jenis === 'ultah' && s.ucapan) k.appendChild(el_('div', 'kh-ucapan', s.ucapan));
    if (s.jumlahHalaman > 1) k.appendChild(el_('div', 'kh-halaman', 'Halaman ' + s.halaman + ' dari ' + s.jumlahHalaman));
    // muat: ucapan boleh mengecil sampai batas bawah (3,4% sisi pendek), lalu nama sampai 6,6%; tidak lebih kecil dari itu
    var u = Math.min(st.sw, st.sh) / 100, uc = k.querySelector('.kh-ucapan'), n = 0, fs = 3.7;
    while (uc && k.scrollHeight > k.clientHeight + 1 && fs > 3.4 && n < 4) { fs -= 0.1; uc.style.fontSize = (fs * u) + 'px'; n++; }
    var nm = k.querySelectorAll('.kh-nama'), fn = 8.2; n = 0;
    while (nm.length && k.scrollHeight > k.clientHeight + 1 && fn > 6.6 && n < 10) { fn -= 0.2; for (i = 0; i < nm.length; i++) nm[i].style.fontSize = (fn * u) + 'px'; n++; }
  }
  var lapisAktif = 'A', idAktif = null, kunciAktif = '', timerPutar = null, berjalan = false;

  /** Tulis nama tamu pada lapis Greeting: huruf kapital, posisi/ukuran/rata dari aplikasi, mengecil otomatis bila terlalu panjang. */
  function isiNama(el, s) {
    if (!el) return;
    if (!s || s.jenis !== 'greeting' || !s.nama || (s.berlaku && wibSekarang().ms > s.berlaku)) { el.style.display = 'none'; el.textContent = ''; return; }
    var u = Math.min(st.sw, st.sh) / 100, fs = s.ukuran * u, g = el.style;                    // satuan: 1% sisi terpendek panggung
    el.textContent = s.nama.toUpperCase();
    g.display = 'block'; g.fontSize = fs + 'px'; g.top = s.y + '%'; g.textAlign = s.rata === 'tengah' ? 'center' : (s.rata === 'kiri' ? 'left' : 'right');          // nilai CSS yang sah
    if (s.rata === 'tengah') { g.left = s.x + '%'; g.right = 'auto'; g.width = Math.max(10, 2 * Math.min(s.x, 100 - s.x) * 0.96) + '%'; g.webkitTransform = g.transform = 'translate(-50%, -0.59em)'; }
    else if (s.rata === 'kiri') { g.left = s.x + '%'; g.right = 'auto'; g.width = Math.max(10, 100 - s.x - 4) + '%'; g.webkitTransform = g.transform = 'translate(0, -0.59em)'; }
    else { g.left = 'auto'; g.right = (100 - s.x) + '%'; g.width = Math.max(10, s.x - 4) + '%'; g.webkitTransform = g.transform = 'translate(0, -0.59em)'; }
    var n = 0; while (el.offsetHeight > fs * 1.25 * 4 && n < 16) { fs *= 0.9; g.fontSize = fs + 'px'; n++; }   // paling banyak 4 baris
  }

  function infoKosong() {
    if (st.listOk && daftarServer.length > 0 && st.jumlahBelum > 0 && st.jumlahSiap === 0) return ['Memuat gambar...', st.jumlahSiap + ' dari ' + st.jumlahDaftar + ' gambar siap'];
    if (st.listOk && daftarServer.length > 0 && !playlist.length) return ['', ''];              // semua slide sedang di luar jadwal: layar logo bersih (rinciannya ada di panel)
    if (st.listOk) return ['Belum ada gambar yang tayang', 'Tambah dan aktifkan gambar di menu Input > Layar TV, tab ' + (POTRET ? 'Reception' : 'VIP') + '.'];
    if (st.listBeruntun > 0) return ['Menunggu koneksi internet...', 'Detail: ' + st.listErr];
    return ['Menyiapkan layar TV...', ''];
  }
  var kosongRinci = document.getElementById('kosongRinci');
  function renderKosong() { var i = infoKosong(); kosongTeks.textContent = i[0]; if (kosongRinci) kosongRinci.textContent = i[1]; }
  function tampilKosong(ya) {
    kosong.className = 'lapis splash' + (ya ? ' aktif' : '');
    if (ya) { lapA.className = 'lapis'; lapB.className = 'lapis'; idAktif = null; kunciAktif = ''; stage.removeAttribute('data-slide'); st.diputar = '-'; }
    renderKosong();
  }
  function indeksBerikut() {
    if (!playlist.length) return -1;
    var pos = -1; for (var i = 0; i < playlist.length; i++) if (playlist[i].id === idAktif) { pos = i; break; }
    return (pos + 1) % playlist.length;
  }
  function tampilSlide(slide) {
    var ke = lapisAktif === 'A' ? 'B' : 'A', img = ke === 'A' ? imgA : imgB, lapKe = ke === 'A' ? lapA : lapB, lapDari = ke === 'A' ? lapB : lapA;
    var url = urlGambar[kunciSlide(slide)], namaEl = ke === 'A' ? namaA : namaB, kartuEl = ke === 'A' ? kartuA : kartuB, auto = khusus(slide);
    var selesai = false;
    isiNama(namaEl, slide);
    lapKe.className = auto ? 'lapis khusus' : 'lapis';
    function naik() {
      if (selesai) return; selesai = true;
      lapKe.className = 'lapis aktif' + (auto ? ' khusus' : ''); lapDari.className = 'lapis' + (/khusus/.test(lapDari.className) ? ' khusus' : ''); kosong.className = 'lapis splash';
      lapisAktif = ke; idAktif = slide.id; kunciAktif = kunciSlide(slide); stage.setAttribute('data-slide', slide.id); st.diputar = slide.id;
    }
    if (auto) { bangunKartu(kartuEl, slide); naik(); return; }                      // slide otomatis: tanpa gambar, langsung tampil
    kartuEl.innerHTML = '';
    img.onload = naik; img.onerror = function () { catat('Gambar ' + slide.id + ' gagal ditampilkan'); delete urlGambar[kunciSlide(slide)]; bangunPlaylist(); };
    img.src = url;
    if (img.decode) img.decode().then(naik, function () { /* onload/onerror yang menangani */ });
    setTimeout(naik, 3000);                                         // jaring pengaman bila decode/onload tidak pernah datang
  }
  function langkah() {
    clearTimeout(timerPutar); timerPutar = null;
    if (!playlist.length) { berjalan = false; tampilKosong(true); return; }
    var i = indeksBerikut(), s = playlist[i];
    if (s.id !== idAktif || kunciSlide(s) !== kunciAktif || (!khusus(s) && !urlGambar[kunciSlide(s)]) || lapisAktifKosong()) tampilSlide(s);
    timerPutar = setTimeout(langkah, s.detik * 1000);
  }
  function lapisAktifKosong() { return idAktif === null; }
  function mulaiPutar() {
    if (!playlist.length) { if (berjalan) { clearTimeout(timerPutar); berjalan = false; } tampilKosong(true); return; }
    if (berjalan) return;                                           // sudah memutar: playlist baru dipakai pada langkah berikutnya
    berjalan = true; langkah();
  }

  /* ---------- Layar penuh & wake lock ---------- */
  function layarPenuhAktif() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
  function masukLayarPenuh() {
    var el = document.documentElement, f = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen;
    if (!f) { catat('Layar penuh: browser tidak menyediakan'); return; }
    try {
      var r = f.call(el);
      if (r && r.then) r.then(function () { catat('Layar penuh: berhasil'); }, function (e) { catat('Layar penuh: ditolak (' + ((e && e.name) || '?') + ')'); });
    } catch (e) { catat('Layar penuh: galat ' + e.message); }
  }
  function keluarLayarPenuh() { var f = document.exitFullscreen || document.webkitExitFullscreen; if (f) { try { f.call(document); } catch (e) {} } }
  function ganti() { if (layarPenuhAktif()) keluarLayarPenuh(); else masukLayarPenuh(); mintaWake(); ulangVideo(); }
  function onFs() { catat('Layar penuh: ' + (layarPenuhAktif() ? 'aktif' : 'keluar')); }
  document.addEventListener('fullscreenchange', onFs); document.addEventListener('webkitfullscreenchange', onFs);
  var wl = null;
  function mintaWake() {
    if (!('wakeLock' in navigator)) { st.wake = 'tidak didukung browser'; return; }
    navigator.wakeLock.request('screen').then(function (l) {
      wl = l; st.wake = 'aktif'; catat('Wake Lock: aktif');
      l.addEventListener('release', function () { st.wake = 'lepas'; catat('Wake Lock: lepas'); });
    }, function (e) { st.wake = 'ditolak (' + ((e && e.name) || '?') + ')'; catat('Wake Lock: ' + st.wake); });
  }

  /* ---------- Jaringan ---------- */
  function ping() {
    var t0 = Date.now(), ac = ('AbortController' in window) ? new AbortController() : null;
    var to = setTimeout(function () { if (ac) ac.abort(); }, 10000);
    fetch('/manifest.json?ping=' + t0, { cache: 'no-store', signal: ac ? ac.signal : undefined }).then(function (r) {
      clearTimeout(to); if (!r.ok) throw new Error('HTTP ' + r.status);
      st.pingOk = Date.now(); st.pingMs = st.pingOk - t0;
      if (st.pingBeruntun > 0) catat('Jaringan pulih (gagal ' + st.pingBeruntun + 'x berturut-turut)');
      st.pingBeruntun = 0;
    }).catch(function (e) {
      clearTimeout(to); st.pingGagal++; st.pingBeruntun++;
      if (st.pingBeruntun === 1) catat('Ping gagal: ' + ((e && e.name) || 'galat'));
    });
  }
  window.addEventListener('offline', function () { catat('Browser: OFFLINE'); });
  window.addEventListener('online', function () { catat('Browser: online lagi'); ambilDaftar(); });
  document.addEventListener('visibilitychange', function () {
    catat('Halaman ' + (document.visibilityState === 'hidden' ? 'DISEMBUNYIKAN (tab/layar tidak aktif)' : 'tampil lagi'));
    if (document.visibilityState === 'visible') { if (wl) mintaWake(); ulangVideo(); ambilDaftar(); }
  });
  window.addEventListener('error', function (e) { catat('Galat skrip: ' + String(e.message || '?').slice(0, 80)); });

  /* ---------- Kelancaran ---------- */
  function ukurFps() {
    var n = 0, t0 = performance.now(), selesai = false;
    function f(t) { n++; if (t - t0 >= 2000) { selesai = true; st.fps = Math.round(n * 1000 / (t - t0)); st.fpsWaktu = Date.now(); } else requestAnimationFrame(f); }
    requestAnimationFrame(f);
    setTimeout(function () { if (!selesai) { st.fps = 0; st.fpsWaktu = Date.now(); } }, 6000);
  }

  /* ---------- Muat ulang otomatis harian (default 03:00) ---------- */
  var targetReload = (function () {
    var det = parseInt(qs('reloadDetik'), 10);
    if (det > 0) return Date.now() + det * 1000;
    var t = (qs('reload') || '03:00').split(':'), now = new Date();
    var d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(t[0], 10) || 0, parseInt(t[1], 10) || 0, 0, 0);
    if (d.getTime() <= now.getTime()) d = new Date(d.getTime() + 86400000);
    return d.getTime();
  })();
  function cekReload() {
    if (Date.now() >= targetReload) {
      catat('Muat ulang otomatis');
      simpan(K_RELOAD, String((parseInt(baca(K_RELOAD), 10) || 0) + 1));
      try { window.sessionStorage.setItem('tvReloadAuto', '1'); } catch (e) {}
      location.reload();
    }
  }

  /* ---------- Panel diagnosa ---------- */
  var panel = document.getElementById('panel'), isi = document.getElementById('isi');
  var ua = navigator.userAgent || '', mChrome = ua.match(/Chrome\/([\d.]+)/), webos = /Web0S|webOS|SmartTV/i.test(ua);
  function baris(k, v, kelas) { return '<div class="b"><div class="k">' + k + '</div><div class="v' + (kelas ? ' ' + kelas : '') + '">' + v + '</div></div>'; }
  function gambar() {
    if (panel.className.indexOf('sembunyi') !== -1) return;
    var now = new Date(), mulai = parseInt(baca(K_MULAI), 10) || mulaiHalaman;
    var W = window.innerWidth, H = window.innerHeight, dpr = window.devicePixelRatio || 1;
    var ping = st.pingOk ? (st.pingBeruntun > 0 ? ['gagal ' + st.pingBeruntun + 'x berturut-turut', 'bad'] : [st.pingMs + ' ms &middot; ' + Math.max(0, Math.round((Date.now() - st.pingOk) / 1000)) + ' dtk lalu', 'ok'])
                         : (st.pingGagal ? ['belum pernah berhasil (gagal ' + st.pingGagal + 'x)', 'bad'] : ['memeriksa...', '']);
    var daft = st.listOk ? [st.jumlahSiap + ' dari ' + st.jumlahDaftar + ' slide siap &middot; versi ' + esc(st.versi) + ' &middot; diambil ' + jamTeks(new Date(st.listOk)) + ' (' + st.sumber + ')' + (st.listBeruntun ? ' &middot; GAGAL ' + st.listBeruntun + 'x: ' + esc(st.listErr) : ''), st.listBeruntun ? 'warn' : (st.jumlahSiap < st.jumlahDaftar ? 'warn' : 'ok')]
                       : (st.listBeruntun ? ['BELUM BERHASIL (' + st.listBeruntun + 'x): ' + esc(st.listErr), 'bad'] : ['mengambil...', '']);
    var pil = document.getElementById('pilStatus');
    if (pil) {
      var offline = navigator.onLine === false || st.pingBeruntun >= 2;
      var teks = offline ? 'Offline' : (st.listBeruntun > 0 ? 'Daftar bermasalah' : (st.listOk ? 'Terhubung' : 'Memeriksa...'));
      pil.textContent = teks; pil.className = 'pil ' + (offline ? 'merah' : (st.listBeruntun > 0 ? 'kuning' : (st.listOk ? 'hijau' : '')));
    }
    var mem = (performance && performance.memory) ? Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB' : 'tidak tersedia';
    var h = '';
    h += baris('Waktu TV', jamTeks(now) + ' &middot; ' + p2(now.getDate()) + '/' + p2(now.getMonth() + 1) + '/' + now.getFullYear());
    h += baris('Halaman berjalan', durasi(Date.now() - mulaiHalaman) + ' &nbsp;(sejak pertama dibuka: ' + durasi(Date.now() - mulai) + ')');
    h += baris('Muat ulang otomatis', (parseInt(baca(K_RELOAD), 10) || 0) + ' kali &middot; berikutnya ' + jamTeks(new Date(targetReload)));
    h += baris('Daftar tayang', daft[0], daft[1]);
    var wb = wibSekarang();
    h += baris('Jadwal', 'WIB ' + wb.teks + ' (' + NAMA_HARI[wb.hari] + ') &middot; tayang sekarang ' + st.jumlahJadwal + ' dari ' + st.jumlahSiap + ' slide siap' + (st.jumlahSiap > st.jumlahJadwal ? ' (' + (st.jumlahSiap - st.jumlahJadwal) + ' di luar jadwal)' : ''), st.jumlahSiap > 0 && st.jumlahJadwal === 0 ? 'warn' : '');
    h += baris('Sedang tampil', esc(st.diputar) + ' &middot; memeriksa tiap ' + DETIK_AMBIL + ' dtk');
    h += baris('Jendela browser', W + ' \u00D7 ' + H + ' &middot; layar ' + (screen.width || '?') + ' \u00D7 ' + (screen.height || '?') + ' &middot; piksel x' + dpr);
    h += baris('Layar', POTRET ? 'Reception (portrait)' : 'VIP (landscape)');
    h += baris('Tampilan', (POTRET ? 'portrait, putar ' + rot + '&deg; (diatur dari remote)' : 'landscape tetap') + ' &middot; panggung ' + st.sw + ' \u00D7 ' + st.sh);
    h += baris('Layar penuh', layarPenuhAktif() ? 'AKTIF' : 'tidak aktif', layarPenuhAktif() ? 'ok' : 'warn');
    h += baris('Penjaga screensaver', esc(st.video), st.video.indexOf('memutar') === 0 ? 'ok' : (jagaMode === '0' ? '' : 'warn'));
    h += baris('Fitur browser', 'layar penuh: ' + ((document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen) ? 'ada' : 'TIDAK ADA') + ' &middot; wake lock: ' + esc(st.wake) + ' &middot; simpan gambar: ' + (('caches' in window) ? 'ada' : 'TIDAK ADA (hanya memori)'));
    h += baris('Browser', (mChrome ? 'Chromium ' + esc(mChrome[1]) : 'bukan Chromium') + (webos ? ' &middot; webOS terdeteksi' : ''));
    h += baris('Jaringan', (navigator.onLine === false ? 'OFFLINE' : 'online') + ' &middot; ' + ping[0], navigator.onLine === false ? 'bad' : ping[1]);
    h += baris('Kelancaran', st.fps === null ? 'mengukur...' : (st.fps + ' fps' + (st.fps && st.fps < 25 ? ' (berat)' : '') + ' &middot; diukur ' + jamTeks(new Date(st.fpsWaktu))) + ' &middot; memori JS ' + mem, st.fps !== null && st.fps < 25 ? 'warn' : '');
    h += '<div class="ua">' + esc(ua) + '</div>';
    var log = bacaLog().slice(-8).reverse(), l = '';
    for (var i = 0; i < log.length; i++) l += '<div>' + jamTeks(new Date(log[i][0])) + ' &nbsp;' + esc(log[i][1]) + '</div>';
    h += '<div class="log"><b>Catatan kejadian (terbaru di atas)</b>' + (l || '<div>(kosong)</div>') + '</div>';
    isi.innerHTML = h;
  }
  function togglePanel() { panel.className = panel.className.indexOf('sembunyi') !== -1 ? '' : 'sembunyi'; gambar(); }

  /* ---------- Masukan: remote & pointer ---------- */
  document.addEventListener('keydown', function (e) {
    var k = e.keyCode || e.which, ae = document.activeElement;
    if (k === 13 && ae && ae.tagName === 'BUTTON') return;
    if (POTRET && (k === 37 || k === 49)) setRot(270);
    else if (POTRET && (k === 39 || k === 50)) setRot(90);
    else if (k === 40 || k === 51) togglePanel();
    else if (k === 13 || k === 32) ganti();
    else return;
    e.preventDefault();
  });
  document.addEventListener('click', function (e) {
    var t = e.target, aksi = t && t.getAttribute ? t.getAttribute('data-aksi') : null;
    if (aksi) {
      if (t.blur) t.blur();
      if (aksi === 'kiri') setRot(270); else if (aksi === 'kanan') setRot(90);
      else if (aksi === 'penuh') ganti(); else if (aksi === 'tutup') togglePanel(); else if (aksi === 'reload') location.reload();
      return;
    }
    if (panel.contains(t)) return;
    ganti();
  });
  var sepiTimer = null;
  function gerak() { document.body.className = ''; clearTimeout(sepiTimer); sepiTimer = setTimeout(function () { document.body.className = 'sepi'; }, 4000); }
  document.addEventListener('mousemove', gerak); gerak();

  /* ---------- Penjaga screensaver ----------
     webOS 6 ke atas tidak punya sakelar screensaver. TERBUKTI di TV ini: berkas video MP4 kecil (jaga.mp4, hitam) yang diputar berulang
     di BELAKANG tampilan mencegah screensaver muncul, sementara tampilan web tetap normal.
     ?jaga=latar (bawaan, tak terlihat) | sudut (titik hitam mungil di pojok) | mati. Pilihan diingat. */
  var jagaMode = (function () {
    var v = qs('jaga'); if (v === 'latar' || v === 'sudut' || v === 'mati') simpan(K_JAGA, v);
    var t = (v === 'latar' || v === 'sudut' || v === 'mati') ? v : baca(K_JAGA); return (t === 'sudut' || t === 'mati') ? t : 'latar';
  })();
  var jagaEl = document.getElementById('jagaVideo');
  function ulangVideo() { if (!jagaEl || jagaMode === 'mati' || !jagaEl.paused) return; try { var p = jagaEl.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
  function mulaiJagaVideo() {
    if (!jagaEl) return;
    if (jagaMode === 'mati') { jagaEl.parentNode.removeChild(jagaEl); jagaEl = null; st.video = 'mati'; return; }
    var gv = jagaEl.style; gv.position = 'fixed'; gv.display = 'block'; gv.pointerEvents = 'none'; gv.background = '#000';
    if (jagaMode === 'sudut') { gv.right = '0'; gv.bottom = '0'; gv.width = '64px'; gv.height = '36px'; gv.zIndex = '20'; }
    else { gv.left = '0'; gv.top = '0'; gv.width = '100%'; gv.height = '100%'; gv.zIndex = '0'; }
    jagaEl.addEventListener('playing', function () { if (st.video.indexOf('memutar') !== 0) catat('Video penjaga screensaver: memutar (' + jagaMode + ')'); st.video = 'memutar (' + jagaMode + ')'; });
    var galatTercatat = false;       // galat pemuatan berkas muncul pada elemen <source>, bukan <video>: tangkap lewat fase capture
    jagaEl.addEventListener('error', function (e) {
      if (galatTercatat) return; galatTercatat = true;
      st.video = 'GALAT video (' + (e && e.target && e.target.tagName === 'SOURCE' ? 'berkas jaga.mp4 tidak ditemukan / tidak bisa diputar' : 'kode ' + (jagaEl.error ? jagaEl.error.code : '?')) + '), pastikan jaga.mp4 ada di GitHub';
      catat('Video penjaga screensaver: ' + st.video);
    }, true);
    jagaEl.muted = true; jagaEl.loop = true; st.video = 'memulai (' + jagaMode + ')';
    try { var p = jagaEl.play(); if (p && p.then) p.then(null, function (e) { st.video = 'ditolak (' + ((e && e.name) || '?') + ') - tekan OK'; }); } catch (e) { st.video = 'galat: ' + e.message; }
    setInterval(function () {                                       // pengawas: coba lagi tiap 30 dtk (mis. jaga.mp4 baru diunggah)
      if (!jagaEl) return;
      if (jagaEl.networkState === 3) { try { jagaEl.load(); ulangVideo(); } catch (e) {} return; }
      if (jagaEl.paused) { catat('Video penjaga berhenti, diputar ulang'); ulangVideo(); }
    }, 30000);
  }

  /* ---------- Mulai ---------- */
  if (!baca(K_MULAI)) simpan(K_MULAI, String(mulaiHalaman));
  var otomatis = false;
  try { otomatis = window.sessionStorage.getItem('tvReloadAuto') === '1'; window.sessionStorage.removeItem('tvReloadAuto'); } catch (e) {}
  if (qs('info') === '1') panel.className = '';
  layout();
  mulaiJagaVideo();
  catat(otomatis ? 'Mulai setelah muat ulang otomatis' : 'Halaman dibuka');

  // 1) Langsung tayang dari daftar & gambar yang tersimpan (tanpa menunggu internet)
  (function () {
    var t = null; try { t = JSON.parse(baca(K_DAFTAR) || 'null'); } catch (e) {}
    if (t && Array.isArray(t.slides)) {
      daftarServer = bersihkanDaftar(t.slides); st.versi = String(t.versi || '-');
      var of = Number(t.offset); if (isFinite(of) && Math.abs(of) < 3e11) offsetWaktu = of;              // jam server terakhir yang diketahui (berguna saat dinyalakan tanpa internet)
      var rantai = Promise.resolve();
      daftarServer.forEach(function (s) { rantai = rantai.then(function () { return pastikanGambar(s, false); }); });
      rantai.then(function () { if (!sedangSinkron) bangunPlaylist(); if (playlist.length) catat('Tayang dari simpanan browser (' + playlist.length + ' slide)'); });
    } else tampilKosong(true);
  })();
  // 2) Ambil daftar terbaru, lalu periksa berkala
  ambilDaftar(); setInterval(ambilDaftar, DETIK_AMBIL * 1000);
  setInterval(function () { bangunPlaylist(); }, 30000);                                              // saring jadwal tiap 30 dtk (dan nama Greeting yang sudah kedaluwarsa)
  if (KONF.uji) window.TV_UJI = { jadwalAktif: jadwalAktif, slideAman: slideAman, wibSekarang: wibSekarang, isiNama: isiNama, halaman: function (s) { return halamanKhusus(slideAman(s), wibSekarang()); }, geser: function (ms) { offsetWaktu = ms; bangunPlaylist(); }, kunci: kunciSlide };
  ping(); setInterval(ping, DETIK_PING * 1000);
  setTimeout(ukurFps, 3000); setInterval(ukurFps, DETIK_FPS * 1000);
  setInterval(function () { if (kosong.className.indexOf('aktif') !== -1) renderKosong(); gambar(); cekReload(); }, 1000);
  gambar();

  /* ---------- Service worker (sw.js): halaman ini tetap bisa dibuka walau TV dinyalakan tanpa internet ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function (err) { catat('Service worker gagal: ' + String((err && err.message) || err).slice(0, 40)); });
    });
  }
})();

