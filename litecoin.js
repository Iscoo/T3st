function convertTime(e) {
    var t = Math.floor(e / 3600),
        n = Math.floor((e - 3600 * t) / 60),
        i = (e - 3600 * t) % 60;
    return t = t.toString(), n = n.toString(), i = i.toString(), t.length < 2 && (t = "0" + t), n.length < 2 && (n = "0" + n), i.length < 2 && (i = "0" + i), t + ":" + n + ":" + i
}

function checkAvaible(e, t) {
    var n = (Date.now() - e) / 1e3,
        i = Math.ceil(60 * t - n);
    return i
}

function notifyMe(e, t) {
    function n() {
        var n = new Notification(t.name, {
            body: t.pay,
            icon: "/images/crypto-icons/" + currency + ".png"
        });
        n.onclick = function(i) {
            timer(e, 60 * t.time + 60), localStorage.setItem("faucet-" + t.name, Date.now()), window.open(t.link, "_blank"), n.close()
        }, setTimeout(function() {
            n.close()
        }, 1e4)
    }
    "granted" === Notification.permission && $("#switch-notification")[0].checked && n()
}

function getPermissionNotification() {
    "Notification" in window || alert("This browser does not support desktop notification"), "denied" === Notification.permission && "default" !== Notification.permission || Notification.requestPermission(function(e) {
        "granted" === e && console.log("Permisos concedidos")
    })
}

function timer(e, t) {
    function n() {
        if (t <= 0) {
            var n = list[e];
            $("#claim-" + e).css("display", "initial"), $("#reset-" + e).css("display", "none"), window.clearInterval(i), $("#reset-" + e).click(void 0), document.querySelector('tr[data-id="' + e + '"] > td.time > div.countdown').innerHTML = convertTime(60 * n.time), notifyMe(e, n)
        } else t--, document.querySelector('tr[data-id="' + e + '"] > td.time > div.countdown').innerHTML = convertTime(t)
    }
    $("#claim-" + e).css("display", "none"), $("#reset-" + e).css("display", "initial");
    var i = self.setInterval(function() {
        n()
    }, 1e3);
    $("#reset-" + e).click(function() {
        window.clearInterval(i)
    })
}

function create() {
    for (var e = 0; e < list.length; e++) {
        f = list[e], timeTotal = convertTime(60 * f.time);
        var t = '<tr class="faucet" data-id="' + e + '" data-faucet="' + f.name + '" data-time="' + f.time + '"><td>' + f.name + "</td><td>" + f.pay + '</td><td class="time"><div class="countdown">' + timeTotal + '</div></td><td class="center-align"><button id="claim-' + e + '" data-id="' + e + '" class="btn claim">CLAIM</button><button id=reset-' + e + ' data-id="' + e + '" style="display:none;" class="btn red reset">RESET</button></td></tr>';
        $("#faucet-list")[0].innerHTML += t
    }
}

function init() {
    localStorage.getItem("switch-notification") && ($("#switch-notification")[0].checked = !0);
    for (var e = 0; e < list.length; e++) {
        var t = ($(".faucet"), list[e]);
        if (localStorage.getItem("faucet-" + t.name)) {
            var n = localStorage.getItem("faucet-" + t.name),
                i = checkAvaible(n, t.time) + 40;
            i >= 0 && (document.querySelector('tr[data-id="' + e + '"] > td.time > div.countdown').innerHTML = convertTime(i), timer(e, i), $("#claim-" + e).css("display", "none"), $("#reset-" + e).css("display", "initial"))
        }
    }
}
if (! function(e, t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(e, t) {
        "use strict";

        function n(e, t) {
            t = t || K;
            var n = t.createElement("script");
            n.text = e, t.head.appendChild(n).parentNode.removeChild(n)
        }

        function i(e) {
            var t = !!e && "length" in e && e.length,
                n = fe.type(e);
            return "function" !== n && !fe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }

        function r(e, t, n) {
            if (fe.isFunction(t)) return fe.grep(e, function(e, i) {
                return !!t.call(e, i, e) !== n
            });
            if (t.nodeType) return fe.grep(e, function(e) {
                return e === t !== n
            });
            if ("string" == typeof t) {
                if (Ce.test(t)) return fe.filter(t, e, n);
                t = fe.filter(t, e)
            }
            return fe.grep(e, function(e) {
                return re.call(t, e) > -1 !== n && 1 === e.nodeType
            })
        }

        function o(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }

        function a(e) {
            var t = {};
            return fe.each(e.match(Ae) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function s(e) {
            return e
        }

        function l(e) {
            throw e
        }

        function u(e, t, n) {
            var i;
            try {
                e && fe.isFunction(i = e.promise) ? i.call(e).done(t).fail(n) : e && fe.isFunction(i = e.then) ? i.call(e, t, n) : t.call(void 0, e)
            } catch (e) {
                n.call(void 0, e)
            }
        }

        function c() {
            K.removeEventListener("DOMContentLoaded", c), e.removeEventListener("load", c), fe.ready()
        }

        function d() {
            this.expando = fe.expando + d.uid++
        }

        function f(e, t, n) {
            var i;
            if (void 0 === n && 1 === e.nodeType)
                if (i = "data-" + t.replace(Me, "-$&").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Le.test(n) ? JSON.parse(n) : n)
                    } catch (e) {}
                    Ie.set(e, t, n)
                } else n = void 0;
            return n
        }

        function p(e, t, n, i) {
            var r, o = 1,
                a = 20,
                s = i ? function() {
                    return i.cur()
                } : function() {
                    return fe.css(e, t, "")
                },
                l = s(),
                u = n && n[3] || (fe.cssNumber[t] ? "" : "px"),
                c = (fe.cssNumber[t] || "px" !== u && +l) && _e.exec(fe.css(e, t));
            if (c && c[3] !== u) {
                u = u || c[3], n = n || [], c = +l || 1;
                do o = o || ".5", c /= o, fe.style(e, t, c + u); while (o !== (o = s() / l) && 1 !== o && --a)
            }
            return n && (c = +c || +l || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = r)), r
        }

        function h(e) {
            var t, n = e.ownerDocument,
                i = e.nodeName,
                r = ze[i];
            return r ? r : (t = n.body.appendChild(n.createElement(i)), r = fe.css(t, "display"), t.parentNode.removeChild(t), "none" === r && (r = "block"), ze[i] = r, r)
        }

        function v(e, t) {
            for (var n, i, r = [], o = 0, a = e.length; o < a; o++) i = e[o], i.style && (n = i.style.display, t ? ("none" === n && (r[o] = Ne.get(i, "display") || null, r[o] || (i.style.display = "")), "" === i.style.display && $e(i) && (r[o] = h(i))) : "none" !== n && (r[o] = "none", Ne.set(i, "display", n)));
            for (o = 0; o < a; o++) null != r[o] && (e[o].style.display = r[o]);
            return e
        }

        function g(e, t) {
            var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
            return void 0 === t || t && fe.nodeName(e, t) ? fe.merge([e], n) : n
        }

        function m(e, t) {
            for (var n = 0, i = e.length; n < i; n++) Ne.set(e[n], "globalEval", !t || Ne.get(t[n], "globalEval"))
        }

        function y(e, t, n, i, r) {
            for (var o, a, s, l, u, c, d = t.createDocumentFragment(), f = [], p = 0, h = e.length; p < h; p++)
                if (o = e[p], o || 0 === o)
                    if ("object" === fe.type(o)) fe.merge(f, o.nodeType ? [o] : o);
                    else if (Be.test(o)) {
                for (a = a || d.appendChild(t.createElement("div")), s = (Ve.exec(o) || ["", ""])[1].toLowerCase(), l = Xe[s] || Xe._default, a.innerHTML = l[1] + fe.htmlPrefilter(o) + l[2], c = l[0]; c--;) a = a.lastChild;
                fe.merge(f, a.childNodes), a = d.firstChild, a.textContent = ""
            } else f.push(t.createTextNode(o));
            for (d.textContent = "", p = 0; o = f[p++];)
                if (i && fe.inArray(o, i) > -1) r && r.push(o);
                else if (u = fe.contains(o.ownerDocument, o), a = g(d.appendChild(o), "script"), u && m(a), n)
                for (c = 0; o = a[c++];) Qe.test(o.type || "") && n.push(o);
            return d
        }

        function b() {
            return !0
        }

        function x() {
            return !1
        }

        function w() {
            try {
                return K.activeElement
            } catch (e) {}
        }

        function C(e, t, n, i, r, o) {
            var a, s;
            if ("object" == typeof t) {
                "string" != typeof n && (i = i || n, n = void 0);
                for (s in t) C(e, s, n, i, t[s], o);
                return e
            }
            if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), r === !1) r = x;
            else if (!r) return e;
            return 1 === o && (a = r, r = function(e) {
                return fe().off(e), a.apply(this, arguments)
            }, r.guid = a.guid || (a.guid = fe.guid++)), e.each(function() {
                fe.event.add(this, t, r, i, n)
            })
        }

        function T(e, t) {
            return fe.nodeName(e, "table") && fe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e : e
        }

        function k(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function S(e) {
            var t = tt.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function E(e, t) {
            var n, i, r, o, a, s, l, u;
            if (1 === t.nodeType) {
                if (Ne.hasData(e) && (o = Ne.access(e), a = Ne.set(t, o), u = o.events)) {
                    delete a.handle, a.events = {};
                    for (r in u)
                        for (n = 0, i = u[r].length; n < i; n++) fe.event.add(t, r, u[r][n])
                }
                Ie.hasData(e) && (s = Ie.access(e), l = fe.extend({}, s), Ie.set(t, l))
            }
        }

        function P(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && We.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }

        function A(e, t, i, r) {
            t = ne.apply([], t);
            var o, a, s, l, u, c, d = 0,
                f = e.length,
                p = f - 1,
                h = t[0],
                v = fe.isFunction(h);
            if (v || f > 1 && "string" == typeof h && !ce.checkClone && et.test(h)) return e.each(function(n) {
                var o = e.eq(n);
                v && (t[0] = h.call(this, n, o.html())), A(o, t, i, r)
            });
            if (f && (o = y(t, e[0].ownerDocument, !1, e, r), a = o.firstChild, 1 === o.childNodes.length && (o = a), a || r)) {
                for (s = fe.map(g(o, "script"), k), l = s.length; d < f; d++) u = o, d !== p && (u = fe.clone(u, !0, !0), l && fe.merge(s, g(u, "script"))), i.call(e[d], u, d);
                if (l)
                    for (c = s[s.length - 1].ownerDocument, fe.map(s, S), d = 0; d < l; d++) u = s[d], Qe.test(u.type || "") && !Ne.access(u, "globalEval") && fe.contains(c, u) && (u.src ? fe._evalUrl && fe._evalUrl(u.src) : n(u.textContent.replace(nt, ""), c))
            }
            return e
        }

        function O(e, t, n) {
            for (var i, r = t ? fe.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || fe.cleanData(g(i)), i.parentNode && (n && fe.contains(i.ownerDocument, i) && m(g(i, "script")), i.parentNode.removeChild(i));
            return e
        }

        function D(e, t, n) {
            var i, r, o, a, s = e.style;
            return n = n || ot(e), n && (a = n.getPropertyValue(t) || n[t], "" !== a || fe.contains(e.ownerDocument, e) || (a = fe.style(e, t)), !ce.pixelMarginRight() && rt.test(a) && it.test(t) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o)), void 0 !== a ? a + "" : a
        }

        function q(e, t) {
            return {
                get: function() {
                    return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }

        function j(e) {
            if (e in ct) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = ut.length; n--;)
                if (e = ut[n] + t, e in ct) return e
        }

        function N(e, t, n) {
            var i = _e.exec(t);
            return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
        }

        function I(e, t, n, i, r) {
            for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += fe.css(e, n + Fe[o], !0, r)), i ? ("content" === n && (a -= fe.css(e, "padding" + Fe[o], !0, r)), "margin" !== n && (a -= fe.css(e, "border" + Fe[o] + "Width", !0, r))) : (a += fe.css(e, "padding" + Fe[o], !0, r), "padding" !== n && (a += fe.css(e, "border" + Fe[o] + "Width", !0, r)));
            return a
        }

        function L(e, t, n) {
            var i, r = !0,
                o = ot(e),
                a = "border-box" === fe.css(e, "boxSizing", !1, o);
            if (e.getClientRects().length && (i = e.getBoundingClientRect()[t]), i <= 0 || null == i) {
                if (i = D(e, t, o), (i < 0 || null == i) && (i = e.style[t]), rt.test(i)) return i;
                r = a && (ce.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
            }
            return i + I(e, t, n || (a ? "border" : "content"), r, o) + "px"
        }

        function M(e, t, n, i, r) {
            return new M.prototype.init(e, t, n, i, r)
        }

        function H() {
            ft && (e.requestAnimationFrame(H), fe.fx.tick())
        }

        function _() {
            return e.setTimeout(function() {
                dt = void 0
            }), dt = fe.now()
        }

        function F(e, t) {
            var n, i = 0,
                r = {
                    height: e
                };
            for (t = t ? 1 : 0; i < 4; i += 2 - t) n = Fe[i], r["margin" + n] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e), r
        }

        function $(e, t, n) {
            for (var i, r = (W.tweeners[t] || []).concat(W.tweeners["*"]), o = 0, a = r.length; o < a; o++)
                if (i = r[o].call(n, t, e)) return i
        }

        function R(e, t, n) {
            var i, r, o, a, s, l, u, c, d = "width" in t || "height" in t,
                f = this,
                p = {},
                h = e.style,
                g = e.nodeType && $e(e),
                m = Ne.get(e, "fxshow");
            n.queue || (a = fe._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                a.unqueued || s()
            }), a.unqueued++, f.always(function() {
                f.always(function() {
                    a.unqueued--, fe.queue(e, "fx").length || a.empty.fire()
                })
            }));
            for (i in t)
                if (r = t[i], pt.test(r)) {
                    if (delete t[i], o = o || "toggle" === r, r === (g ? "hide" : "show")) {
                        if ("show" !== r || !m || void 0 === m[i]) continue;
                        g = !0
                    }
                    p[i] = m && m[i] || fe.style(e, i)
                }
            if (l = !fe.isEmptyObject(t), l || !fe.isEmptyObject(p)) {
                d && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], u = m && m.display, null == u && (u = Ne.get(e, "display")), c = fe.css(e, "display"), "none" === c && (u ? c = u : (v([e], !0), u = e.style.display || u, c = fe.css(e, "display"), v([e]))), ("inline" === c || "inline-block" === c && null != u) && "none" === fe.css(e, "float") && (l || (f.done(function() {
                    h.display = u
                }), null == u && (c = h.display, u = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", f.always(function() {
                    h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                })), l = !1;
                for (i in p) l || (m ? "hidden" in m && (g = m.hidden) : m = Ne.access(e, "fxshow", {
                    display: u
                }), o && (m.hidden = !g), g && v([e], !0), f.done(function() {
                    g || v([e]), Ne.remove(e, "fxshow");
                    for (i in p) fe.style(e, i, p[i])
                })), l = $(g ? m[i] : 0, i, f), i in m || (m[i] = l.start, g && (l.end = l.start, l.start = 0))
            }
        }

        function z(e, t) {
            var n, i, r, o, a;
            for (n in e)
                if (i = fe.camelCase(n), r = t[i], o = e[n], fe.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = fe.cssHooks[i], a && "expand" in a) {
                    o = a.expand(o), delete e[i];
                    for (n in o) n in e || (e[n] = o[n], t[n] = r)
                } else t[i] = r
        }

        function W(e, t, n) {
            var i, r, o = 0,
                a = W.prefilters.length,
                s = fe.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (r) return !1;
                    for (var t = dt || _(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, o = 1 - i, a = 0, l = u.tweens.length; a < l; a++) u.tweens[a].run(o);
                    return s.notifyWith(e, [u, o, n]), o < 1 && l ? n : (s.resolveWith(e, [u]), !1)
                },
                u = s.promise({
                    elem: e,
                    props: fe.extend({}, t),
                    opts: fe.extend(!0, {
                        specialEasing: {},
                        easing: fe.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: dt || _(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var i = fe.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                        return u.tweens.push(i), i
                    },
                    stop: function(t) {
                        var n = 0,
                            i = t ? u.tweens.length : 0;
                        if (r) return this;
                        for (r = !0; n < i; n++) u.tweens[n].run(1);
                        return t ? (s.notifyWith(e, [u, 1, 0]), s.resolveWith(e, [u, t])) : s.rejectWith(e, [u, t]), this
                    }
                }),
                c = u.props;
            for (z(c, u.opts.specialEasing); o < a; o++)
                if (i = W.prefilters[o].call(u, e, c, u.opts)) return fe.isFunction(i.stop) && (fe._queueHooks(u.elem, u.opts.queue).stop = fe.proxy(i.stop, i)), i;
            return fe.map(c, $, u), fe.isFunction(u.opts.start) && u.opts.start.call(e, u), fe.fx.timer(fe.extend(l, {
                elem: e,
                anim: u,
                queue: u.opts.queue
            })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
        }

        function V(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }

        function Q(e, t, n, i) {
            var r;
            if (fe.isArray(t)) fe.each(t, function(t, r) {
                n || Et.test(e) ? i(e, r) : Q(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
            });
            else if (n || "object" !== fe.type(t)) i(e, t);
            else
                for (r in t) Q(e + "[" + r + "]", t[r], n, i)
        }

        function X(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var i, r = 0,
                    o = t.toLowerCase().match(Ae) || [];
                if (fe.isFunction(n))
                    for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
            }
        }

        function B(e, t, n, i) {
            function r(s) {
                var l;
                return o[s] = !0, fe.each(e[s] || [], function(e, s) {
                    var u = s(t, n, i);
                    return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
                }), l
            }
            var o = {},
                a = e === _t;
            return r(t.dataTypes[0]) || !o["*"] && r("*")
        }

        function Y(e, t) {
            var n, i, r = fe.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
            return i && fe.extend(!0, e, i), e
        }

        function U(e, t, n) {
            for (var i, r, o, a, s = e.contents, l = e.dataTypes;
                "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
            if (i)
                for (r in s)
                    if (s[r] && s[r].test(i)) {
                        l.unshift(r);
                        break
                    }
            if (l[0] in n) o = l[0];
            else {
                for (r in n) {
                    if (!l[0] || e.converters[r + " " + l[0]]) {
                        o = r;
                        break
                    }
                    a || (a = r)
                }
                o = o || a
            }
            if (o) return o !== l[0] && l.unshift(o), n[o]
        }

        function G(e, t, n, i) {
            var r, o, a, s, l, u = {},
                c = e.dataTypes.slice();
            if (c[1])
                for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
            for (o = c.shift(); o;)
                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                if (a = u[l + " " + o] || u["* " + o], !a)
                    for (r in u)
                        if (s = r.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                            a === !0 ? a = u[r] : u[r] !== !0 && (o = s[0], c.unshift(s[1]));
                            break
                        }
                if (a !== !0)
                    if (a && e.throws) t = a(t);
                    else try {
                        t = a(t)
                    } catch (e) {
                        return {
                            state: "parsererror",
                            error: a ? e : "No conversion from " + l + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function J(e) {
            return fe.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
        }
        var Z = [],
            K = e.document,
            ee = Object.getPrototypeOf,
            te = Z.slice,
            ne = Z.concat,
            ie = Z.push,
            re = Z.indexOf,
            oe = {},
            ae = oe.toString,
            se = oe.hasOwnProperty,
            le = se.toString,
            ue = le.call(Object),
            ce = {},
            de = "3.1.0",
            fe = function(e, t) {
                return new fe.fn.init(e, t)
            },
            pe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            he = /^-ms-/,
            ve = /-([a-z])/g,
            ge = function(e, t) {
                return t.toUpperCase()
            };
        fe.fn = fe.prototype = {
            jquery: de,
            constructor: fe,
            length: 0,
            toArray: function() {
                return te.call(this)
            },
            get: function(e) {
                return null != e ? e < 0 ? this[e + this.length] : this[e] : te.call(this)
            },
            pushStack: function(e) {
                var t = fe.merge(this.constructor(), e);
                return t.prevObject = this, t
            },
            each: function(e) {
                return fe.each(this, e)
            },
            map: function(e) {
                return this.pushStack(fe.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(te.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ie,
            sort: Z.sort,
            splice: Z.splice
        }, fe.extend = fe.fn.extend = function() {
            var e, t, n, i, r, o, a = arguments[0] || {},
                s = 1,
                l = arguments.length,
                u = !1;
            for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || fe.isFunction(a) || (a = {}), s === l && (a = this, s--); s < l; s++)
                if (null != (e = arguments[s]))
                    for (t in e) n = a[t], i = e[t], a !== i && (u && i && (fe.isPlainObject(i) || (r = fe.isArray(i))) ? (r ? (r = !1, o = n && fe.isArray(n) ? n : []) : o = n && fe.isPlainObject(n) ? n : {}, a[t] = fe.extend(u, o, i)) : void 0 !== i && (a[t] = i));
            return a
        }, fe.extend({
            expando: "jQuery" + (de + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === fe.type(e)
            },
            isArray: Array.isArray,
            isWindow: function(e) {
                return null != e && e === e.window
            },
            isNumeric: function(e) {
                var t = fe.type(e);
                return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
            },
            isPlainObject: function(e) {
                var t, n;
                return !(!e || "[object Object]" !== ae.call(e) || (t = ee(e)) && (n = se.call(t, "constructor") && t.constructor, "function" != typeof n || le.call(n) !== ue))
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? oe[ae.call(e)] || "object" : typeof e
            },
            globalEval: function(e) {
                n(e)
            },
            camelCase: function(e) {
                return e.replace(he, "ms-").replace(ve, ge)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t) {
                var n, r = 0;
                if (i(e))
                    for (n = e.length; r < n && t.call(e[r], r, e[r]) !== !1; r++);
                else
                    for (r in e)
                        if (t.call(e[r], r, e[r]) === !1) break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(pe, "")
            },
            makeArray: function(e, t) {
                var n = t || [];
                return null != e && (i(Object(e)) ? fe.merge(n, "string" == typeof e ? [e] : e) : ie.call(n, e)), n
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : re.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, i = 0, r = e.length; i < n; i++) e[r++] = t[i];
                return e.length = r, e
            },
            grep: function(e, t, n) {
                for (var i, r = [], o = 0, a = e.length, s = !n; o < a; o++) i = !t(e[o], o), i !== s && r.push(e[o]);
                return r
            },
            map: function(e, t, n) {
                var r, o, a = 0,
                    s = [];
                if (i(e))
                    for (r = e.length; a < r; a++) o = t(e[a], a, n), null != o && s.push(o);
                else
                    for (a in e) o = t(e[a], a, n), null != o && s.push(o);
                return ne.apply([], s)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, i, r;
                if ("string" == typeof t && (n = e[t], t = e, e = n), fe.isFunction(e)) return i = te.call(arguments, 2), r = function() {
                    return e.apply(t || this, i.concat(te.call(arguments)))
                }, r.guid = e.guid = e.guid || fe.guid++, r
            },
            now: Date.now,
            support: ce
        }), "function" == typeof Symbol && (fe.fn[Symbol.iterator] = Z[Symbol.iterator]), fe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            oe["[object " + t + "]"] = t.toLowerCase()
        });
        var me = function(e) {
            function t(e, t, n, i) {
                var r, o, a, s, l, u, c, f = t && t.ownerDocument,
                    h = t ? t.nodeType : 9;
                if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
                if (!i && ((t ? t.ownerDocument || t : R) !== N && j(t), t = t || N, L)) {
                    if (11 !== h && (l = me.exec(e)))
                        if (r = l[1]) {
                            if (9 === h) {
                                if (!(a = t.getElementById(r))) return n;
                                if (a.id === r) return n.push(a), n
                            } else if (f && (a = f.getElementById(r)) && F(t, a) && a.id === r) return n.push(a), n
                        } else {
                            if (l[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
                            if ((r = l[3]) && C.getElementsByClassName && t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(r)), n
                        }
                    if (C.qsa && !X[e + " "] && (!M || !M.test(e))) {
                        if (1 !== h) f = t, c = e;
                        else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((s = t.getAttribute("id")) ? s = s.replace(we, Ce) : t.setAttribute("id", s = $), u = E(e), o = u.length; o--;) u[o] = "#" + s + " " + p(u[o]);
                            c = u.join(","), f = ye.test(e) && d(t.parentNode) || t
                        }
                        if (c) try {
                            return Z.apply(n, f.querySelectorAll(c)), n
                        } catch (e) {} finally {
                            s === $ && t.removeAttribute("id")
                        }
                    }
                }
                return A(e.replace(se, "$1"), t, n, i)
            }

            function n() {
                function e(n, i) {
                    return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = i
                }
                var t = [];
                return e
            }

            function i(e) {
                return e[$] = !0, e
            }

            function r(e) {
                var t = N.createElement("fieldset");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function o(e, t) {
                for (var n = e.split("|"), i = n.length; i--;) T.attrHandle[n[i]] = t
            }

            function a(e, t) {
                var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function s(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function l(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function u(e) {
                return function(t) {
                    return "label" in t && t.disabled === e || "form" in t && t.disabled === e || "form" in t && t.disabled === !1 && (t.isDisabled === e || t.isDisabled !== !e && ("label" in t || !ke(t)) !== e)
                }
            }

            function c(e) {
                return i(function(t) {
                    return t = +t, i(function(n, i) {
                        for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                    })
                })
            }

            function d(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }

            function f() {}

            function p(e) {
                for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                return i
            }

            function h(e, t, n) {
                var i = t.dir,
                    r = t.next,
                    o = r || i,
                    a = n && "parentNode" === o,
                    s = W++;
                return t.first ? function(t, n, r) {
                    for (; t = t[i];)
                        if (1 === t.nodeType || a) return e(t, n, r)
                } : function(t, n, l) {
                    var u, c, d, f = [z, s];
                    if (l) {
                        for (; t = t[i];)
                            if ((1 === t.nodeType || a) && e(t, n, l)) return !0
                    } else
                        for (; t = t[i];)
                            if (1 === t.nodeType || a)
                                if (d = t[$] || (t[$] = {}), c = d[t.uniqueID] || (d[t.uniqueID] = {}), r && r === t.nodeName.toLowerCase()) t = t[i] || t;
                                else {
                                    if ((u = c[o]) && u[0] === z && u[1] === s) return f[2] = u[2];
                                    if (c[o] = f, f[2] = e(t, n, l)) return !0
                                }
                }
            }

            function v(e) {
                return e.length > 1 ? function(t, n, i) {
                    for (var r = e.length; r--;)
                        if (!e[r](t, n, i)) return !1;
                    return !0
                } : e[0]
            }

            function g(e, n, i) {
                for (var r = 0, o = n.length; r < o; r++) t(e, n[r], i);
                return i
            }

            function m(e, t, n, i, r) {
                for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++)(o = e[s]) && (n && !n(o, i, r) || (a.push(o), u && t.push(s)));
                return a
            }

            function y(e, t, n, r, o, a) {
                return r && !r[$] && (r = y(r)), o && !o[$] && (o = y(o, a)), i(function(i, a, s, l) {
                    var u, c, d, f = [],
                        p = [],
                        h = a.length,
                        v = i || g(t || "*", s.nodeType ? [s] : s, []),
                        y = !e || !i && t ? v : m(v, f, e, s, l),
                        b = n ? o || (i ? e : h || r) ? [] : a : y;
                    if (n && n(y, b, s, l), r)
                        for (u = m(b, p), r(u, [], s, l), c = u.length; c--;)(d = u[c]) && (b[p[c]] = !(y[p[c]] = d));
                    if (i) {
                        if (o || e) {
                            if (o) {
                                for (u = [], c = b.length; c--;)(d = b[c]) && u.push(y[c] = d);
                                o(null, b = [], u, l)
                            }
                            for (c = b.length; c--;)(d = b[c]) && (u = o ? ee(i, d) : f[c]) > -1 && (i[u] = !(a[u] = d))
                        }
                    } else b = m(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, l) : Z.apply(a, b)
                })
            }

            function b(e) {
                for (var t, n, i, r = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, l = h(function(e) {
                        return e === t
                    }, a, !0), u = h(function(e) {
                        return ee(t, e) > -1
                    }, a, !0), c = [function(e, n, i) {
                        var r = !o && (i || n !== O) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
                        return t = null, r
                    }]; s < r; s++)
                    if (n = T.relative[e[s].type]) c = [h(v(c), n)];
                    else {
                        if (n = T.filter[e[s].type].apply(null, e[s].matches), n[$]) {
                            for (i = ++s; i < r && !T.relative[e[i].type]; i++);
                            return y(s > 1 && v(c), s > 1 && p(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace(se, "$1"), n, s < i && b(e.slice(s, i)), i < r && b(e = e.slice(i)), i < r && p(e))
                        }
                        c.push(n)
                    }
                return v(c)
            }

            function x(e, n) {
                var r = n.length > 0,
                    o = e.length > 0,
                    a = function(i, a, s, l, u) {
                        var c, d, f, p = 0,
                            h = "0",
                            v = i && [],
                            g = [],
                            y = O,
                            b = i || o && T.find.TAG("*", u),
                            x = z += null == y ? 1 : Math.random() || .1,
                            w = b.length;
                        for (u && (O = a === N || a || u); h !== w && null != (c = b[h]); h++) {
                            if (o && c) {
                                for (d = 0, a || c.ownerDocument === N || (j(c), s = !L); f = e[d++];)
                                    if (f(c, a || N, s)) {
                                        l.push(c);
                                        break
                                    }
                                u && (z = x)
                            }
                            r && ((c = !f && c) && p--, i && v.push(c))
                        }
                        if (p += h, r && h !== p) {
                            for (d = 0; f = n[d++];) f(v, g, a, s);
                            if (i) {
                                if (p > 0)
                                    for (; h--;) v[h] || g[h] || (g[h] = G.call(l));
                                g = m(g)
                            }
                            Z.apply(l, g), u && !i && g.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                        }
                        return u && (z = x, O = y), v
                    };
                return r ? i(a) : a
            }
            var w, C, T, k, S, E, P, A, O, D, q, j, N, I, L, M, H, _, F, $ = "sizzle" + 1 * new Date,
                R = e.document,
                z = 0,
                W = 0,
                V = n(),
                Q = n(),
                X = n(),
                B = function(e, t) {
                    return e === t && (q = !0), 0
                },
                Y = {}.hasOwnProperty,
                U = [],
                G = U.pop,
                J = U.push,
                Z = U.push,
                K = U.slice,
                ee = function(e, t) {
                    for (var n = 0, i = e.length; n < i; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                ie = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
                oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)",
                ae = new RegExp(ne + "+", "g"),
                se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                le = new RegExp("^" + ne + "*," + ne + "*"),
                ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                de = new RegExp(oe),
                fe = new RegExp("^" + ie + "$"),
                pe = {
                    ID: new RegExp("^#(" + ie + ")"),
                    CLASS: new RegExp("^\\.(" + ie + ")"),
                    TAG: new RegExp("^(" + ie + "|[*])"),
                    ATTR: new RegExp("^" + re),
                    PSEUDO: new RegExp("^" + oe),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                },
                he = /^(?:input|select|textarea|button)$/i,
                ve = /^h\d$/i,
                ge = /^[^{]+\{\s*\[native \w/,
                me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ye = /[+~]/,
                be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                xe = function(e, t, n) {
                    var i = "0x" + t - 65536;
                    return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                },
                we = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
                Ce = function(e, t) {
                    return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                },
                Te = function() {
                    j()
                },
                ke = h(function(e) {
                    return e.disabled === !0
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                Z.apply(U = K.call(R.childNodes), R.childNodes), U[R.childNodes.length].nodeType
            } catch (e) {
                Z = {
                    apply: U.length ? function(e, t) {
                        J.apply(e, K.call(t))
                    } : function(e, t) {
                        for (var n = e.length, i = 0; e[n++] = t[i++];);
                        e.length = n - 1
                    }
                }
            }
            C = t.support = {}, S = t.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }, j = t.setDocument = function(e) {
                var t, n, i = e ? e.ownerDocument || e : R;
                return i !== N && 9 === i.nodeType && i.documentElement ? (N = i, I = N.documentElement, L = !S(N), R !== N && (n = N.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)), C.attributes = r(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), C.getElementsByTagName = r(function(e) {
                    return e.appendChild(N.createComment("")), !e.getElementsByTagName("*").length
                }), C.getElementsByClassName = ge.test(N.getElementsByClassName), C.getById = r(function(e) {
                    return I.appendChild(e).id = $, !N.getElementsByName || !N.getElementsByName($).length
                }), C.getById ? (T.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && L) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }, T.filter.ID = function(e) {
                    var t = e.replace(be, xe);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete T.find.ID, T.filter.ID = function(e) {
                    var t = e.replace(be, xe);
                    return function(e) {
                        var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), T.find.TAG = C.getElementsByTagName ? function(e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : C.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, i = [],
                        r = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return o
                }, T.find.CLASS = C.getElementsByClassName && function(e, t) {
                    if ("undefined" != typeof t.getElementsByClassName && L) return t.getElementsByClassName(e)
                }, H = [], M = [], (C.qsa = ge.test(N.querySelectorAll)) && (r(function(e) {
                    I.appendChild(e).innerHTML = "<a id='" + $ + "'></a><select id='" + $ + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && M.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || M.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + $ + "-]").length || M.push("~="), e.querySelectorAll(":checked").length || M.push(":checked"), e.querySelectorAll("a#" + $ + "+*").length || M.push(".#.+[+~]")
                }), r(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = N.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && M.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && M.push(":enabled", ":disabled"), I.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && M.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), M.push(",.*:")
                })), (C.matchesSelector = ge.test(_ = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && r(function(e) {
                    C.disconnectedMatch = _.call(e, "*"), _.call(e, "[s!='']:x"), H.push("!=", oe)
                }), M = M.length && new RegExp(M.join("|")), H = H.length && new RegExp(H.join("|")), t = ge.test(I.compareDocumentPosition), F = t || ge.test(I.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        i = t && t.parentNode;
                    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, B = t ? function(e, t) {
                    if (e === t) return q = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !C.sortDetached && t.compareDocumentPosition(e) === n ? e === N || e.ownerDocument === R && F(R, e) ? -1 : t === N || t.ownerDocument === R && F(R, t) ? 1 : D ? ee(D, e) - ee(D, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return q = !0, 0;
                    var n, i = 0,
                        r = e.parentNode,
                        o = t.parentNode,
                        s = [e],
                        l = [t];
                    if (!r || !o) return e === N ? -1 : t === N ? 1 : r ? -1 : o ? 1 : D ? ee(D, e) - ee(D, t) : 0;
                    if (r === o) return a(e, t);
                    for (n = e; n = n.parentNode;) s.unshift(n);
                    for (n = t; n = n.parentNode;) l.unshift(n);
                    for (; s[i] === l[i];) i++;
                    return i ? a(s[i], l[i]) : s[i] === R ? -1 : l[i] === R ? 1 : 0
                }, N) : N
            }, t.matches = function(e, n) {
                return t(e, null, null, n)
            }, t.matchesSelector = function(e, n) {
                if ((e.ownerDocument || e) !== N && j(e), n = n.replace(ce, "='$1']"), C.matchesSelector && L && !X[n + " "] && (!H || !H.test(n)) && (!M || !M.test(n))) try {
                    var i = _.call(e, n);
                    if (i || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                } catch (e) {}
                return t(n, N, null, [e]).length > 0
            }, t.contains = function(e, t) {
                return (e.ownerDocument || e) !== N && j(e), F(e, t)
            }, t.attr = function(e, t) {
                (e.ownerDocument || e) !== N && j(e);
                var n = T.attrHandle[t.toLowerCase()],
                    i = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
                return void 0 !== i ? i : C.attributes || !L ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }, t.escape = function(e) {
                return (e + "").replace(we, Ce)
            }, t.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, t.uniqueSort = function(e) {
                var t, n = [],
                    i = 0,
                    r = 0;
                if (q = !C.detectDuplicates, D = !C.sortStable && e.slice(0), e.sort(B), q) {
                    for (; t = e[r++];) t === e[r] && (i = n.push(r));
                    for (; i--;) e.splice(n[i], 1)
                }
                return D = null, e
            }, k = t.getText = function(e) {
                var t, n = "",
                    i = 0,
                    r = e.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += k(e)
                    } else if (3 === r || 4 === r) return e.nodeValue
                } else
                    for (; t = e[i++];) n += k(t);
                return n
            }, T = t.selectors = {
                cacheLength: 50,
                createPseudo: i,
                match: pe,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(be, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(be, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(be, xe).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = V[e + " "];
                        return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && V(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, n, i) {
                        return function(r) {
                            var o = t.attr(r, e);
                            return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"));
                        }
                    },
                    CHILD: function(e, t, n, i, r) {
                        var o = "nth" !== e.slice(0, 3),
                            a = "last" !== e.slice(-4),
                            s = "of-type" === t;
                        return 1 === i && 0 === r ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, l) {
                            var u, c, d, f, p, h, v = o !== a ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                m = s && t.nodeName.toLowerCase(),
                                y = !l && !s,
                                b = !1;
                            if (g) {
                                if (o) {
                                    for (; v;) {
                                        for (f = t; f = f[v];)
                                            if (s ? f.nodeName.toLowerCase() === m : 1 === f.nodeType) return !1;
                                        h = v = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                    for (f = g, d = f[$] || (f[$] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), u = c[e] || [], p = u[0] === z && u[1], b = p && u[2], f = p && g.childNodes[p]; f = ++p && f && f[v] || (b = p = 0) || h.pop();)
                                        if (1 === f.nodeType && ++b && f === t) {
                                            c[e] = [z, p, b];
                                            break
                                        }
                                } else if (y && (f = t, d = f[$] || (f[$] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), u = c[e] || [], p = u[0] === z && u[1], b = p), b === !1)
                                    for (;
                                        (f = ++p && f && f[v] || (b = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== m : 1 !== f.nodeType) || !++b || (y && (d = f[$] || (f[$] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), c[e] = [z, b]), f !== t)););
                                return b -= r, b === i || b % i === 0 && b / i >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, n) {
                        var r, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return o[$] ? o(n) : o.length > 1 ? (r = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                            for (var i, r = o(e, n), a = r.length; a--;) i = ee(e, r[a]), e[i] = !(t[i] = r[a])
                        }) : function(e) {
                            return o(e, 0, r)
                        }) : o
                    }
                },
                pseudos: {
                    not: i(function(e) {
                        var t = [],
                            n = [],
                            r = P(e.replace(se, "$1"));
                        return r[$] ? i(function(e, t, n, i) {
                            for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                        }) : function(e, i, o) {
                            return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                        }
                    }),
                    has: i(function(e) {
                        return function(n) {
                            return t(e, n).length > 0
                        }
                    }),
                    contains: i(function(e) {
                        return e = e.replace(be, xe),
                            function(t) {
                                return (t.textContent || t.innerText || k(t)).indexOf(e) > -1
                            }
                    }),
                    lang: i(function(e) {
                        return fe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, xe).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === I
                    },
                    focus: function(e) {
                        return e === N.activeElement && (!N.hasFocus || N.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: u(!1),
                    disabled: u(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !T.pseudos.empty(e)
                    },
                    header: function(e) {
                        return ve.test(e.nodeName)
                    },
                    input: function(e) {
                        return he.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: c(function() {
                        return [0]
                    }),
                    last: c(function(e, t) {
                        return [t - 1]
                    }),
                    eq: c(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: c(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: c(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: c(function(e, t, n) {
                        for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
                        return e
                    }),
                    gt: c(function(e, t, n) {
                        for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                        return e
                    })
                }
            }, T.pseudos.nth = T.pseudos.eq;
            for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) T.pseudos[w] = s(w);
            for (w in {
                    submit: !0,
                    reset: !0
                }) T.pseudos[w] = l(w);
            return f.prototype = T.filters = T.pseudos, T.setFilters = new f, E = t.tokenize = function(e, n) {
                var i, r, o, a, s, l, u, c = Q[e + " "];
                if (c) return n ? 0 : c.slice(0);
                for (s = e, l = [], u = T.preFilter; s;) {
                    i && !(r = le.exec(s)) || (r && (s = s.slice(r[0].length) || s), l.push(o = [])), i = !1, (r = ue.exec(s)) && (i = r.shift(), o.push({
                        value: i,
                        type: r[0].replace(se, " ")
                    }), s = s.slice(i.length));
                    for (a in T.filter) !(r = pe[a].exec(s)) || u[a] && !(r = u[a](r)) || (i = r.shift(), o.push({
                        value: i,
                        type: a,
                        matches: r
                    }), s = s.slice(i.length));
                    if (!i) break
                }
                return n ? s.length : s ? t.error(e) : Q(e, l).slice(0)
            }, P = t.compile = function(e, t) {
                var n, i = [],
                    r = [],
                    o = X[e + " "];
                if (!o) {
                    for (t || (t = E(e)), n = t.length; n--;) o = b(t[n]), o[$] ? i.push(o) : r.push(o);
                    o = X(e, x(r, i)), o.selector = e
                }
                return o
            }, A = t.select = function(e, t, n, i) {
                var r, o, a, s, l, u = "function" == typeof e && e,
                    c = !i && E(e = u.selector || e);
                if (n = n || [], 1 === c.length) {
                    if (o = c[0] = c[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && C.getById && 9 === t.nodeType && L && T.relative[o[1].type]) {
                        if (t = (T.find.ID(a.matches[0].replace(be, xe), t) || [])[0], !t) return n;
                        u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (r = pe.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !T.relative[s = a.type]);)
                        if ((l = T.find[s]) && (i = l(a.matches[0].replace(be, xe), ye.test(o[0].type) && d(t.parentNode) || t))) {
                            if (o.splice(r, 1), e = i.length && p(o), !e) return Z.apply(n, i), n;
                            break
                        }
                }
                return (u || P(e, c))(i, t, !L, n, !t || ye.test(e) && d(t.parentNode) || t), n
            }, C.sortStable = $.split("").sort(B).join("") === $, C.detectDuplicates = !!q, j(), C.sortDetached = r(function(e) {
                return 1 & e.compareDocumentPosition(N.createElement("fieldset"))
            }), r(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function(e, t, n) {
                if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), C.attributes && r(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || o("value", function(e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
            }), r(function(e) {
                return null == e.getAttribute("disabled")
            }) || o(te, function(e, t, n) {
                var i;
                if (!n) return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }), t
        }(e);
        fe.find = me, fe.expr = me.selectors, fe.expr[":"] = fe.expr.pseudos, fe.uniqueSort = fe.unique = me.uniqueSort, fe.text = me.getText, fe.isXMLDoc = me.isXML, fe.contains = me.contains, fe.escapeSelector = me.escape;
        var ye = function(e, t, n) {
                for (var i = [], r = void 0 !== n;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (r && fe(e).is(n)) break;
                        i.push(e)
                    }
                return i
            },
            be = function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            },
            xe = fe.expr.match.needsContext,
            we = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            Ce = /^.[^:#\[\.,]*$/;
        fe.filter = function(e, t, n) {
            var i = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? fe.find.matchesSelector(i, e) ? [i] : [] : fe.find.matches(e, fe.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, fe.fn.extend({
            find: function(e) {
                var t, n, i = this.length,
                    r = this;
                if ("string" != typeof e) return this.pushStack(fe(e).filter(function() {
                    for (t = 0; t < i; t++)
                        if (fe.contains(r[t], this)) return !0
                }));
                for (n = this.pushStack([]), t = 0; t < i; t++) fe.find(e, r[t], n);
                return i > 1 ? fe.uniqueSort(n) : n
            },
            filter: function(e) {
                return this.pushStack(r(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(r(this, e || [], !0))
            },
            is: function(e) {
                return !!r(this, "string" == typeof e && xe.test(e) ? fe(e) : e || [], !1).length
            }
        });
        var Te, ke = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            Se = fe.fn.init = function(e, t, n) {
                var i, r;
                if (!e) return this;
                if (n = n || Te, "string" == typeof e) {
                    if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ke.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (i[1]) {
                        if (t = t instanceof fe ? t[0] : t, fe.merge(this, fe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : K, !0)), we.test(i[1]) && fe.isPlainObject(t))
                            for (i in t) fe.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                        return this
                    }
                    return r = K.getElementById(i[2]), r && (this[0] = r, this.length = 1), this
                }
                return e.nodeType ? (this[0] = e, this.length = 1, this) : fe.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(fe) : fe.makeArray(e, this)
            };
        Se.prototype = fe.fn, Te = fe(K);
        var Ee = /^(?:parents|prev(?:Until|All))/,
            Pe = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        fe.fn.extend({
            has: function(e) {
                var t = fe(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var e = 0; e < n; e++)
                        if (fe.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                var n, i = 0,
                    r = this.length,
                    o = [],
                    a = "string" != typeof e && fe(e);
                if (!xe.test(e))
                    for (; i < r; i++)
                        for (n = this[i]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && fe.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            }
                return this.pushStack(o.length > 1 ? fe.uniqueSort(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? re.call(fe(e), this[0]) : re.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(fe.uniqueSort(fe.merge(this.get(), fe(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), fe.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return ye(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return ye(e, "parentNode", n)
            },
            next: function(e) {
                return o(e, "nextSibling")
            },
            prev: function(e) {
                return o(e, "previousSibling")
            },
            nextAll: function(e) {
                return ye(e, "nextSibling")
            },
            prevAll: function(e) {
                return ye(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return ye(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return ye(e, "previousSibling", n)
            },
            siblings: function(e) {
                return be((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return be(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument || fe.merge([], e.childNodes)
            }
        }, function(e, t) {
            fe.fn[e] = function(n, i) {
                var r = fe.map(this, t, n);
                return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = fe.filter(i, r)), this.length > 1 && (Pe[e] || fe.uniqueSort(r), Ee.test(e) && r.reverse()), this.pushStack(r)
            }
        });
        var Ae = /\S+/g;
        fe.Callbacks = function(e) {
            e = "string" == typeof e ? a(e) : fe.extend({}, e);
            var t, n, i, r, o = [],
                s = [],
                l = -1,
                u = function() {
                    for (r = e.once, i = t = !0; s.length; l = -1)
                        for (n = s.shift(); ++l < o.length;) o[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = o.length, n = !1);
                    e.memory || (n = !1), t = !1, r && (o = n ? [] : "")
                },
                c = {
                    add: function() {
                        return o && (n && !t && (l = o.length - 1, s.push(n)), function t(n) {
                            fe.each(n, function(n, i) {
                                fe.isFunction(i) ? e.unique && c.has(i) || o.push(i) : i && i.length && "string" !== fe.type(i) && t(i)
                            })
                        }(arguments), n && !t && u()), this
                    },
                    remove: function() {
                        return fe.each(arguments, function(e, t) {
                            for (var n;
                                (n = fe.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= l && l--
                        }), this
                    },
                    has: function(e) {
                        return e ? fe.inArray(e, o) > -1 : o.length > 0
                    },
                    empty: function() {
                        return o && (o = []), this
                    },
                    disable: function() {
                        return r = s = [], o = n = "", this
                    },
                    disabled: function() {
                        return !o
                    },
                    lock: function() {
                        return r = s = [], n || t || (o = n = ""), this
                    },
                    locked: function() {
                        return !!r
                    },
                    fireWith: function(e, n) {
                        return r || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || u()), this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!i
                    }
                };
            return c
        }, fe.extend({
            Deferred: function(t) {
                var n = [
                        ["notify", "progress", fe.Callbacks("memory"), fe.Callbacks("memory"), 2],
                        ["resolve", "done", fe.Callbacks("once memory"), fe.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", fe.Callbacks("once memory"), fe.Callbacks("once memory"), 1, "rejected"]
                    ],
                    i = "pending",
                    r = {
                        state: function() {
                            return i
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments), this
                        },
                        catch: function(e) {
                            return r.then(null, e)
                        },
                        pipe: function() {
                            var e = arguments;
                            return fe.Deferred(function(t) {
                                fe.each(n, function(n, i) {
                                    var r = fe.isFunction(e[i[4]]) && e[i[4]];
                                    o[i[1]](function() {
                                        var e = r && r.apply(this, arguments);
                                        e && fe.isFunction(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[i[0] + "With"](this, r ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        then: function(t, i, r) {
                            function o(t, n, i, r) {
                                return function() {
                                    var u = this,
                                        c = arguments,
                                        d = function() {
                                            var e, d;
                                            if (!(t < a)) {
                                                if (e = i.apply(u, c), e === n.promise()) throw new TypeError("Thenable self-resolution");
                                                d = e && ("object" == typeof e || "function" == typeof e) && e.then, fe.isFunction(d) ? r ? d.call(e, o(a, n, s, r), o(a, n, l, r)) : (a++, d.call(e, o(a, n, s, r), o(a, n, l, r), o(a, n, s, n.notifyWith))) : (i !== s && (u = void 0, c = [e]), (r || n.resolveWith)(u, c))
                                            }
                                        },
                                        f = r ? d : function() {
                                            try {
                                                d()
                                            } catch (e) {
                                                fe.Deferred.exceptionHook && fe.Deferred.exceptionHook(e, f.stackTrace), t + 1 >= a && (i !== l && (u = void 0, c = [e]), n.rejectWith(u, c))
                                            }
                                        };
                                    t ? f() : (fe.Deferred.getStackHook && (f.stackTrace = fe.Deferred.getStackHook()), e.setTimeout(f))
                                }
                            }
                            var a = 0;
                            return fe.Deferred(function(e) {
                                n[0][3].add(o(0, e, fe.isFunction(r) ? r : s, e.notifyWith)), n[1][3].add(o(0, e, fe.isFunction(t) ? t : s)), n[2][3].add(o(0, e, fe.isFunction(i) ? i : l))
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? fe.extend(e, r) : r
                        }
                    },
                    o = {};
                return fe.each(n, function(e, t) {
                    var a = t[2],
                        s = t[5];
                    r[t[1]] = a.add, s && a.add(function() {
                        i = s
                    }, n[3 - e][2].disable, n[0][2].lock), a.add(t[3].fire), o[t[0]] = function() {
                        return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                    }, o[t[0] + "With"] = a.fireWith
                }), r.promise(o), t && t.call(o, o), o
            },
            when: function(e) {
                var t = arguments.length,
                    n = t,
                    i = Array(n),
                    r = te.call(arguments),
                    o = fe.Deferred(),
                    a = function(e) {
                        return function(n) {
                            i[e] = this, r[e] = arguments.length > 1 ? te.call(arguments) : n, --t || o.resolveWith(i, r)
                        }
                    };
                if (t <= 1 && (u(e, o.done(a(n)).resolve, o.reject), "pending" === o.state() || fe.isFunction(r[n] && r[n].then))) return o.then();
                for (; n--;) u(r[n], a(n), o.reject);
                return o.promise()
            }
        });
        var Oe = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        fe.Deferred.exceptionHook = function(t, n) {
            e.console && e.console.warn && t && Oe.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
        }, fe.readyException = function(t) {
            e.setTimeout(function() {
                throw t
            })
        };
        var De = fe.Deferred();
        fe.fn.ready = function(e) {
            return De.then(e).catch(function(e) {
                fe.readyException(e)
            }), this
        }, fe.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? fe.readyWait++ : fe.ready(!0)
            },
            ready: function(e) {
                (e === !0 ? --fe.readyWait : fe.isReady) || (fe.isReady = !0, e !== !0 && --fe.readyWait > 0 || De.resolveWith(K, [fe]))
            }
        }), fe.ready.then = De.then, "complete" === K.readyState || "loading" !== K.readyState && !K.documentElement.doScroll ? e.setTimeout(fe.ready) : (K.addEventListener("DOMContentLoaded", c), e.addEventListener("load", c));
        var qe = function(e, t, n, i, r, o, a) {
                var s = 0,
                    l = e.length,
                    u = null == n;
                if ("object" === fe.type(n)) {
                    r = !0;
                    for (s in n) qe(e, t, s, n[s], !0, o, a)
                } else if (void 0 !== i && (r = !0, fe.isFunction(i) || (a = !0), u && (a ? (t.call(e, i), t = null) : (u = t, t = function(e, t, n) {
                        return u.call(fe(e), n)
                    })), t))
                    for (; s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
                return r ? e : u ? t.call(e) : l ? t(e[0], n) : o
            },
            je = function(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
            };
        d.uid = 1, d.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {}, je(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(e, t, n) {
                var i, r = this.cache(e);
                if ("string" == typeof t) r[fe.camelCase(t)] = n;
                else
                    for (i in t) r[fe.camelCase(i)] = t[i];
                return r
            },
            get: function(e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][fe.camelCase(t)]
            },
            access: function(e, t, n) {
                return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
            },
            remove: function(e, t) {
                var n, i = e[this.expando];
                if (void 0 !== i) {
                    if (void 0 !== t) {
                        fe.isArray(t) ? t = t.map(fe.camelCase) : (t = fe.camelCase(t), t = t in i ? [t] : t.match(Ae) || []), n = t.length;
                        for (; n--;) delete i[t[n]]
                    }(void 0 === t || fe.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return void 0 !== t && !fe.isEmptyObject(t)
            }
        };
        var Ne = new d,
            Ie = new d,
            Le = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Me = /[A-Z]/g;
        fe.extend({
            hasData: function(e) {
                return Ie.hasData(e) || Ne.hasData(e)
            },
            data: function(e, t, n) {
                return Ie.access(e, t, n)
            },
            removeData: function(e, t) {
                Ie.remove(e, t)
            },
            _data: function(e, t, n) {
                return Ne.access(e, t, n)
            },
            _removeData: function(e, t) {
                Ne.remove(e, t)
            }
        }), fe.fn.extend({
            data: function(e, t) {
                var n, i, r, o = this[0],
                    a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (r = Ie.get(o), 1 === o.nodeType && !Ne.get(o, "hasDataAttrs"))) {
                        for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = fe.camelCase(i.slice(5)), f(o, i, r[i])));
                        Ne.set(o, "hasDataAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof e ? this.each(function() {
                    Ie.set(this, e)
                }) : qe(this, function(t) {
                    var n;
                    if (o && void 0 === t) {
                        if (n = Ie.get(o, e), void 0 !== n) return n;
                        if (n = f(o, e), void 0 !== n) return n
                    } else this.each(function() {
                        Ie.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    Ie.remove(this, e)
                })
            }
        }), fe.extend({
            queue: function(e, t, n) {
                var i;
                if (e) return t = (t || "fx") + "queue", i = Ne.get(e, t), n && (!i || fe.isArray(n) ? i = Ne.access(e, t, fe.makeArray(n)) : i.push(n)), i || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = fe.queue(e, t),
                    i = n.length,
                    r = n.shift(),
                    o = fe._queueHooks(e, t),
                    a = function() {
                        fe.dequeue(e, t)
                    };
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return Ne.get(e, n) || Ne.access(e, n, {
                    empty: fe.Callbacks("once memory").add(function() {
                        Ne.remove(e, [t + "queue", n])
                    })
                })
            }
        }), fe.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? fe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = fe.queue(this, e, t);
                    fe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && fe.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    fe.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, i = 1,
                    r = fe.Deferred(),
                    o = this,
                    a = this.length,
                    s = function() {
                        --i || r.resolveWith(o, [o])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = Ne.get(o[a], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
                return s(), r.promise(t)
            }
        });
        var He = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            _e = new RegExp("^(?:([+-])=|)(" + He + ")([a-z%]*)$", "i"),
            Fe = ["Top", "Right", "Bottom", "Left"],
            $e = function(e, t) {
                return e = t || e, "none" === e.style.display || "" === e.style.display && fe.contains(e.ownerDocument, e) && "none" === fe.css(e, "display")
            },
            Re = function(e, t, n, i) {
                var r, o, a = {};
                for (o in t) a[o] = e.style[o], e.style[o] = t[o];
                r = n.apply(e, i || []);
                for (o in t) e.style[o] = a[o];
                return r
            },
            ze = {};
        fe.fn.extend({
            show: function() {
                return v(this, !0)
            },
            hide: function() {
                return v(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    $e(this) ? fe(this).show() : fe(this).hide()
                })
            }
        });
        var We = /^(?:checkbox|radio)$/i,
            Ve = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            Qe = /^$|\/(?:java|ecma)script/i,
            Xe = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Xe.optgroup = Xe.option, Xe.tbody = Xe.tfoot = Xe.colgroup = Xe.caption = Xe.thead, Xe.th = Xe.td;
        var Be = /<|&#?\w+;/;
        ! function() {
            var e = K.createDocumentFragment(),
                t = e.appendChild(K.createElement("div")),
                n = K.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ce.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", ce.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var Ye = K.documentElement,
            Ue = /^key/,
            Ge = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Je = /^([^.]*)(?:\.(.+)|)/;
        fe.event = {
            global: {},
            add: function(e, t, n, i, r) {
                var o, a, s, l, u, c, d, f, p, h, v, g = Ne.get(e);
                if (g)
                    for (n.handler && (o = n, n = o.handler, r = o.selector), r && fe.find.matchesSelector(Ye, r), n.guid || (n.guid = fe.guid++), (l = g.events) || (l = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                            return "undefined" != typeof fe && fe.event.triggered !== t.type ? fe.event.dispatch.apply(e, arguments) : void 0
                        }), t = (t || "").match(Ae) || [""], u = t.length; u--;) s = Je.exec(t[u]) || [], p = v = s[1], h = (s[2] || "").split(".").sort(), p && (d = fe.event.special[p] || {}, p = (r ? d.delegateType : d.bindType) || p, d = fe.event.special[p] || {}, c = fe.extend({
                        type: p,
                        origType: v,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && fe.expr.match.needsContext.test(r),
                        namespace: h.join(".")
                    }, o), (f = l[p]) || (f = l[p] = [], f.delegateCount = 0, d.setup && d.setup.call(e, i, h, a) !== !1 || e.addEventListener && e.addEventListener(p, a)), d.add && (d.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), r ? f.splice(f.delegateCount++, 0, c) : f.push(c), fe.event.global[p] = !0)
            },
            remove: function(e, t, n, i, r) {
                var o, a, s, l, u, c, d, f, p, h, v, g = Ne.hasData(e) && Ne.get(e);
                if (g && (l = g.events)) {
                    for (t = (t || "").match(Ae) || [""], u = t.length; u--;)
                        if (s = Je.exec(t[u]) || [], p = v = s[1], h = (s[2] || "").split(".").sort(), p) {
                            for (d = fe.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, f = l[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = f.length; o--;) c = f[o], !r && v !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, d.remove && d.remove.call(e, c));
                            a && !f.length && (d.teardown && d.teardown.call(e, h, g.handle) !== !1 || fe.removeEvent(e, p, g.handle), delete l[p])
                        } else
                            for (p in l) fe.event.remove(e, p + t[u], n, i, !0);
                    fe.isEmptyObject(l) && Ne.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, n, i, r, o, a, s = fe.event.fix(e),
                    l = new Array(arguments.length),
                    u = (Ne.get(this, "events") || {})[s.type] || [],
                    c = fe.event.special[s.type] || {};
                for (l[0] = s, t = 1; t < arguments.length; t++) l[t] = arguments[t];
                if (s.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, s) !== !1) {
                    for (a = fe.event.handlers.call(this, s, u), t = 0;
                        (r = a[t++]) && !s.isPropagationStopped();)
                        for (s.currentTarget = r.elem, n = 0;
                            (o = r.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, i = ((fe.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, l), void 0 !== i && (s.result = i) === !1 && (s.preventDefault(), s.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, s), s.result
                }
            },
            handlers: function(e, t) {
                var n, i, r, o, a = [],
                    s = t.delegateCount,
                    l = e.target;
                if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                    for (; l !== this; l = l.parentNode || this)
                        if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                            for (i = [], n = 0; n < s; n++) o = t[n], r = o.selector + " ", void 0 === i[r] && (i[r] = o.needsContext ? fe(r, this).index(l) > -1 : fe.find(r, this, null, [l]).length), i[r] && i.push(o);
                            i.length && a.push({
                                elem: l,
                                handlers: i
                            })
                        }
                return s < t.length && a.push({
                    elem: this,
                    handlers: t.slice(s)
                }), a
            },
            addProp: function(e, t) {
                Object.defineProperty(fe.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: fe.isFunction(t) ? function() {
                        if (this.originalEvent) return t(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[e]
                    },
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: t
                        })
                    }
                })
            },
            fix: function(e) {
                return e[fe.expando] ? e : new fe.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== w() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === w() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && fe.nodeName(this, "input")) return this.click(), !1
                    },
                    _default: function(e) {
                        return fe.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        }, fe.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }, fe.Event = function(e, t) {
            return this instanceof fe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? b : x, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && fe.extend(this, t), this.timeStamp = e && e.timeStamp || fe.now(), void(this[fe.expando] = !0)) : new fe.Event(e, t)
        }, fe.Event.prototype = {
            constructor: fe.Event,
            isDefaultPrevented: x,
            isPropagationStopped: x,
            isImmediatePropagationStopped: x,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = b, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = b, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = b, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, fe.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(e) {
                var t = e.button;
                return null == e.which && Ue.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Ge.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
            }
        }, fe.event.addProp), fe.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            fe.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, i = this,
                        r = e.relatedTarget,
                        o = e.handleObj;
                    return r && (r === i || fe.contains(i, r)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), fe.fn.extend({
            on: function(e, t, n, i) {
                return C(this, e, t, n, i)
            },
            one: function(e, t, n, i) {
                return C(this, e, t, n, i, 1)
            },
            off: function(e, t, n) {
                var i, r;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, fe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (r in e) this.off(r, t, e[r]);
                    return this
                }
                return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = x), this.each(function() {
                    fe.event.remove(this, e, n, t)
                })
            }
        });
        var Ze = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            Ke = /<script|<style|<link/i,
            et = /checked\s*(?:[^=]|=\s*.checked.)/i,
            tt = /^true\/(.*)/,
            nt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        fe.extend({
            htmlPrefilter: function(e) {
                return e.replace(Ze, "<$1></$2>")
            },
            clone: function(e, t, n) {
                var i, r, o, a, s = e.cloneNode(!0),
                    l = fe.contains(e.ownerDocument, e);
                if (!(ce.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || fe.isXMLDoc(e)))
                    for (a = g(s), o = g(e), i = 0, r = o.length; i < r; i++) P(o[i], a[i]);
                if (t)
                    if (n)
                        for (o = o || g(e), a = a || g(s), i = 0, r = o.length; i < r; i++) E(o[i], a[i]);
                    else E(e, s);
                return a = g(s, "script"), a.length > 0 && m(a, !l && g(e, "script")), s
            },
            cleanData: function(e) {
                for (var t, n, i, r = fe.event.special, o = 0; void 0 !== (n = e[o]); o++)
                    if (je(n)) {
                        if (t = n[Ne.expando]) {
                            if (t.events)
                                for (i in t.events) r[i] ? fe.event.remove(n, i) : fe.removeEvent(n, i, t.handle);
                            n[Ne.expando] = void 0
                        }
                        n[Ie.expando] && (n[Ie.expando] = void 0)
                    }
            }
        }), fe.fn.extend({
            detach: function(e) {
                return O(this, e, !0)
            },
            remove: function(e) {
                return O(this, e)
            },
            text: function(e) {
                return qe(this, function(e) {
                    return void 0 === e ? fe.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return A(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = T(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return A(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = T(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return A(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return A(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (fe.cleanData(g(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function() {
                    return fe.clone(this, e, t)
                })
            },
            html: function(e) {
                return qe(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        i = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !Ke.test(e) && !Xe[(Ve.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = fe.htmlPrefilter(e);
                        try {
                            for (; n < i; n++) t = this[n] || {}, 1 === t.nodeType && (fe.cleanData(g(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return A(this, arguments, function(t) {
                    var n = this.parentNode;
                    fe.inArray(this, e) < 0 && (fe.cleanData(g(this)), n && n.replaceChild(t, this))
                }, e)
            }
        }), fe.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            fe.fn[e] = function(e) {
                for (var n, i = [], r = fe(e), o = r.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), fe(r[a])[t](n), ie.apply(i, n.get());
                return this.pushStack(i)
            }
        });
        var it = /^margin/,
            rt = new RegExp("^(" + He + ")(?!px)[a-z%]+$", "i"),
            ot = function(t) {
                var n = t.ownerDocument.defaultView;
                return n && n.opener || (n = e), n.getComputedStyle(t)
            };
        ! function() {
            function t() {
                if (s) {
                    s.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Ye.appendChild(a);
                    var t = e.getComputedStyle(s);
                    n = "1%" !== t.top, o = "2px" === t.marginLeft, i = "4px" === t.width, s.style.marginRight = "50%", r = "4px" === t.marginRight, Ye.removeChild(a), s = null
                }
            }
            var n, i, r, o, a = K.createElement("div"),
                s = K.createElement("div");
            s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", ce.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), fe.extend(ce, {
                pixelPosition: function() {
                    return t(), n
                },
                boxSizingReliable: function() {
                    return t(), i
                },
                pixelMarginRight: function() {
                    return t(), r
                },
                reliableMarginLeft: function() {
                    return t(), o
                }
            }))
        }();
        var at = /^(none|table(?!-c[ea]).+)/,
            st = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            lt = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            ut = ["Webkit", "Moz", "ms"],
            ct = K.createElement("div").style;
        fe.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = D(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(e, t, n, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var r, o, a, s = fe.camelCase(t),
                        l = e.style;
                    return t = fe.cssProps[s] || (fe.cssProps[s] = j(s) || s), a = fe.cssHooks[t] || fe.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : l[t] : (o = typeof n, "string" === o && (r = _e.exec(n)) && r[1] && (n = p(e, t, r), o = "number"), void(null != n && n === n && ("number" === o && (n += r && r[3] || (fe.cssNumber[s] ? "" : "px")), ce.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (l[t] = n))))
                }
            },
            css: function(e, t, n, i) {
                var r, o, a, s = fe.camelCase(t);
                return t = fe.cssProps[s] || (fe.cssProps[s] = j(s) || s), a = fe.cssHooks[t] || fe.cssHooks[s], a && "get" in a && (r = a.get(e, !0, n)), void 0 === r && (r = D(e, t, i)), "normal" === r && t in lt && (r = lt[t]), "" === n || n ? (o = parseFloat(r), n === !0 || isFinite(o) ? o || 0 : r) : r
            }
        }), fe.each(["height", "width"], function(e, t) {
            fe.cssHooks[t] = {
                get: function(e, n, i) {
                    if (n) return !at.test(fe.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? L(e, t, i) : Re(e, st, function() {
                        return L(e, t, i)
                    })
                },
                set: function(e, n, i) {
                    var r, o = i && ot(e),
                        a = i && I(e, t, i, "border-box" === fe.css(e, "boxSizing", !1, o), o);
                    return a && (r = _e.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n, n = fe.css(e, t)), N(e, n, a)
                }
            }
        }), fe.cssHooks.marginLeft = q(ce.reliableMarginLeft, function(e, t) {
            if (t) return (parseFloat(D(e, "marginLeft")) || e.getBoundingClientRect().left - Re(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
        }), fe.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            fe.cssHooks[e + t] = {
                expand: function(n) {
                    for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[e + Fe[i] + t] = o[i] || o[i - 2] || o[0];
                    return r
                }
            }, it.test(e) || (fe.cssHooks[e + t].set = N)
        }), fe.fn.extend({
            css: function(e, t) {
                return qe(this, function(e, t, n) {
                    var i, r, o = {},
                        a = 0;
                    if (fe.isArray(t)) {
                        for (i = ot(e), r = t.length; a < r; a++) o[t[a]] = fe.css(e, t[a], !1, i);
                        return o
                    }
                    return void 0 !== n ? fe.style(e, t, n) : fe.css(e, t)
                }, e, t, arguments.length > 1)
            }
        }), fe.Tween = M, M.prototype = {
            constructor: M,
            init: function(e, t, n, i, r, o) {
                this.elem = e, this.prop = n, this.easing = r || fe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (fe.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = M.propHooks[this.prop];
                return e && e.get ? e.get(this) : M.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = M.propHooks[this.prop];
                return this.options.duration ? this.pos = t = fe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : M.propHooks._default.set(this), this
            }
        }, M.prototype.init.prototype = M.prototype, M.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = fe.css(e.elem, e.prop, ""),
                        t && "auto" !== t ? t : 0)
                },
                set: function(e) {
                    fe.fx.step[e.prop] ? fe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[fe.cssProps[e.prop]] && !fe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : fe.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }, M.propHooks.scrollTop = M.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, fe.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, fe.fx = M.prototype.init, fe.fx.step = {};
        var dt, ft, pt = /^(?:toggle|show|hide)$/,
            ht = /queueHooks$/;
        fe.Animation = fe.extend(W, {
                tweeners: {
                    "*": [function(e, t) {
                        var n = this.createTween(e, t);
                        return p(n.elem, e, _e.exec(t), n), n
                    }]
                },
                tweener: function(e, t) {
                    fe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Ae);
                    for (var n, i = 0, r = e.length; i < r; i++) n = e[i], W.tweeners[n] = W.tweeners[n] || [], W.tweeners[n].unshift(t)
                },
                prefilters: [R],
                prefilter: function(e, t) {
                    t ? W.prefilters.unshift(e) : W.prefilters.push(e)
                }
            }), fe.speed = function(e, t, n) {
                var i = e && "object" == typeof e ? fe.extend({}, e) : {
                    complete: n || !n && t || fe.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !fe.isFunction(t) && t
                };
                return fe.fx.off || K.hidden ? i.duration = 0 : i.duration = "number" == typeof i.duration ? i.duration : i.duration in fe.fx.speeds ? fe.fx.speeds[i.duration] : fe.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                    fe.isFunction(i.old) && i.old.call(this), i.queue && fe.dequeue(this, i.queue)
                }, i
            }, fe.fn.extend({
                fadeTo: function(e, t, n, i) {
                    return this.filter($e).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, i)
                },
                animate: function(e, t, n, i) {
                    var r = fe.isEmptyObject(e),
                        o = fe.speed(t, n, i),
                        a = function() {
                            var t = W(this, fe.extend({}, e), o);
                            (r || Ne.get(this, "finish")) && t.stop(!0)
                        };
                    return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                },
                stop: function(e, t, n) {
                    var i = function(e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            r = null != e && e + "queueHooks",
                            o = fe.timers,
                            a = Ne.get(this);
                        if (r) a[r] && a[r].stop && i(a[r]);
                        else
                            for (r in a) a[r] && a[r].stop && ht.test(r) && i(a[r]);
                        for (r = o.length; r--;) o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                        !t && n || fe.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"), this.each(function() {
                        var t, n = Ne.get(this),
                            i = n[e + "queue"],
                            r = n[e + "queueHooks"],
                            o = fe.timers,
                            a = i ? i.length : 0;
                        for (n.finish = !0, fe.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                        for (t = 0; t < a; t++) i[t] && i[t].finish && i[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), fe.each(["toggle", "show", "hide"], function(e, t) {
                var n = fe.fn[t];
                fe.fn[t] = function(e, i, r) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(F(t, !0), e, i, r)
                }
            }), fe.each({
                slideDown: F("show"),
                slideUp: F("hide"),
                slideToggle: F("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                fe.fn[e] = function(e, n, i) {
                    return this.animate(t, e, n, i)
                }
            }), fe.timers = [], fe.fx.tick = function() {
                var e, t = 0,
                    n = fe.timers;
                for (dt = fe.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
                n.length || fe.fx.stop(), dt = void 0
            }, fe.fx.timer = function(e) {
                fe.timers.push(e), e() ? fe.fx.start() : fe.timers.pop()
            }, fe.fx.interval = 13, fe.fx.start = function() {
                ft || (ft = e.requestAnimationFrame ? e.requestAnimationFrame(H) : e.setInterval(fe.fx.tick, fe.fx.interval))
            }, fe.fx.stop = function() {
                e.cancelAnimationFrame ? e.cancelAnimationFrame(ft) : e.clearInterval(ft), ft = null
            }, fe.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, fe.fn.delay = function(t, n) {
                return t = fe.fx ? fe.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, i) {
                    var r = e.setTimeout(n, t);
                    i.stop = function() {
                        e.clearTimeout(r)
                    }
                })
            },
            function() {
                var e = K.createElement("input"),
                    t = K.createElement("select"),
                    n = t.appendChild(K.createElement("option"));
                e.type = "checkbox", ce.checkOn = "" !== e.value, ce.optSelected = n.selected, e = K.createElement("input"), e.value = "t", e.type = "radio", ce.radioValue = "t" === e.value
            }();
        var vt, gt = fe.expr.attrHandle;
        fe.fn.extend({
            attr: function(e, t) {
                return qe(this, fe.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    fe.removeAttr(this, e)
                })
            }
        }), fe.extend({
            attr: function(e, t, n) {
                var i, r, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? fe.prop(e, t, n) : (1 === o && fe.isXMLDoc(e) || (r = fe.attrHooks[t.toLowerCase()] || (fe.expr.match.bool.test(t) ? vt : void 0)), void 0 !== n ? null === n ? void fe.removeAttr(e, t) : r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = fe.find.attr(e, t), null == i ? void 0 : i))
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!ce.radioValue && "radio" === t && fe.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, i = 0,
                    r = t && t.match(Ae);
                if (r && 1 === e.nodeType)
                    for (; n = r[i++];) e.removeAttribute(n)
            }
        }), vt = {
            set: function(e, t, n) {
                return t === !1 ? fe.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, fe.each(fe.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = gt[t] || fe.find.attr;
            gt[t] = function(e, t, i) {
                var r, o, a = t.toLowerCase();
                return i || (o = gt[a], gt[a] = r, r = null != n(e, t, i) ? a : null, gt[a] = o), r
            }
        });
        var mt = /^(?:input|select|textarea|button)$/i,
            yt = /^(?:a|area)$/i;
        fe.fn.extend({
            prop: function(e, t) {
                return qe(this, fe.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[fe.propFix[e] || e]
                })
            }
        }), fe.extend({
            prop: function(e, t, n) {
                var i, r, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && fe.isXMLDoc(e) || (t = fe.propFix[t] || t, r = fe.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = fe.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : mt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), ce.optSelected || (fe.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), fe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            fe.propFix[this.toLowerCase()] = this
        });
        var bt = /[\t\r\n\f]/g;
        fe.fn.extend({
            addClass: function(e) {
                var t, n, i, r, o, a, s, l = 0;
                if (fe.isFunction(e)) return this.each(function(t) {
                    fe(this).addClass(e.call(this, t, V(this)))
                });
                if ("string" == typeof e && e)
                    for (t = e.match(Ae) || []; n = this[l++];)
                        if (r = V(n), i = 1 === n.nodeType && (" " + r + " ").replace(bt, " ")) {
                            for (a = 0; o = t[a++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                            s = fe.trim(i), r !== s && n.setAttribute("class", s)
                        }
                return this
            },
            removeClass: function(e) {
                var t, n, i, r, o, a, s, l = 0;
                if (fe.isFunction(e)) return this.each(function(t) {
                    fe(this).removeClass(e.call(this, t, V(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof e && e)
                    for (t = e.match(Ae) || []; n = this[l++];)
                        if (r = V(n), i = 1 === n.nodeType && (" " + r + " ").replace(bt, " ")) {
                            for (a = 0; o = t[a++];)
                                for (; i.indexOf(" " + o + " ") > -1;) i = i.replace(" " + o + " ", " ");
                            s = fe.trim(i), r !== s && n.setAttribute("class", s)
                        }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : fe.isFunction(e) ? this.each(function(n) {
                    fe(this).toggleClass(e.call(this, n, V(this), t), t)
                }) : this.each(function() {
                    var t, i, r, o;
                    if ("string" === n)
                        for (i = 0, r = fe(this), o = e.match(Ae) || []; t = o[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                    else void 0 !== e && "boolean" !== n || (t = V(this), t && Ne.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Ne.get(this, "__className__") || ""))
                })
            },
            hasClass: function(e) {
                var t, n, i = 0;
                for (t = " " + e + " "; n = this[i++];)
                    if (1 === n.nodeType && (" " + V(n) + " ").replace(bt, " ").indexOf(t) > -1) return !0;
                return !1
            }
        });
        var xt = /\r/g,
            wt = /[\x20\t\r\n\f]+/g;
        fe.fn.extend({
            val: function(e) {
                var t, n, i, r = this[0];
                return arguments.length ? (i = fe.isFunction(e), this.each(function(n) {
                    var r;
                    1 === this.nodeType && (r = i ? e.call(this, n, fe(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : fe.isArray(r) && (r = fe.map(r, function(e) {
                        return null == e ? "" : e + ""
                    })), t = fe.valHooks[this.type] || fe.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                })) : r ? (t = fe.valHooks[r.type] || fe.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(xt, "") : null == n ? "" : n)) : void 0
            }
        }), fe.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = fe.find.attr(e, "value");
                        return null != t ? t : fe.trim(fe.text(e)).replace(wt, " ")
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type, a = o ? null : [], s = o ? r + 1 : i.length, l = r < 0 ? s : o ? r : 0; l < s; l++)
                            if (n = i[l], (n.selected || l === r) && !n.disabled && (!n.parentNode.disabled || !fe.nodeName(n.parentNode, "optgroup"))) {
                                if (t = fe(n).val(), o) return t;
                                a.push(t)
                            }
                        return a
                    },
                    set: function(e, t) {
                        for (var n, i, r = e.options, o = fe.makeArray(t), a = r.length; a--;) i = r[a], (i.selected = fe.inArray(fe.valHooks.option.get(i), o) > -1) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            }
        }), fe.each(["radio", "checkbox"], function() {
            fe.valHooks[this] = {
                set: function(e, t) {
                    if (fe.isArray(t)) return e.checked = fe.inArray(fe(e).val(), t) > -1
                }
            }, ce.checkOn || (fe.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        });
        var Ct = /^(?:focusinfocus|focusoutblur)$/;
        fe.extend(fe.event, {
            trigger: function(t, n, i, r) {
                var o, a, s, l, u, c, d, f = [i || K],
                    p = se.call(t, "type") ? t.type : t,
                    h = se.call(t, "namespace") ? t.namespace.split(".") : [];
                if (a = s = i = i || K, 3 !== i.nodeType && 8 !== i.nodeType && !Ct.test(p + fe.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."), p = h.shift(), h.sort()), u = p.indexOf(":") < 0 && "on" + p, t = t[fe.expando] ? t : new fe.Event(p, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : fe.makeArray(n, [t]), d = fe.event.special[p] || {}, r || !d.trigger || d.trigger.apply(i, n) !== !1)) {
                    if (!r && !d.noBubble && !fe.isWindow(i)) {
                        for (l = d.delegateType || p, Ct.test(l + p) || (a = a.parentNode); a; a = a.parentNode) f.push(a), s = a;
                        s === (i.ownerDocument || K) && f.push(s.defaultView || s.parentWindow || e)
                    }
                    for (o = 0;
                        (a = f[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? l : d.bindType || p, c = (Ne.get(a, "events") || {})[t.type] && Ne.get(a, "handle"), c && c.apply(a, n), c = u && a[u], c && c.apply && je(a) && (t.result = c.apply(a, n), t.result === !1 && t.preventDefault());
                    return t.type = p, r || t.isDefaultPrevented() || d._default && d._default.apply(f.pop(), n) !== !1 || !je(i) || u && fe.isFunction(i[p]) && !fe.isWindow(i) && (s = i[u], s && (i[u] = null), fe.event.triggered = p, i[p](), fe.event.triggered = void 0, s && (i[u] = s)), t.result
                }
            },
            simulate: function(e, t, n) {
                var i = fe.extend(new fe.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                fe.event.trigger(i, null, t)
            }
        }), fe.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    fe.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) return fe.event.trigger(e, t, n, !0)
            }
        }), fe.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
            fe.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), fe.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), ce.focusin = "onfocusin" in e, ce.focusin || fe.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                fe.event.simulate(t, e.target, fe.event.fix(e))
            };
            fe.event.special[t] = {
                setup: function() {
                    var i = this.ownerDocument || this,
                        r = Ne.access(i, t);
                    r || i.addEventListener(e, n, !0), Ne.access(i, t, (r || 0) + 1)
                },
                teardown: function() {
                    var i = this.ownerDocument || this,
                        r = Ne.access(i, t) - 1;
                    r ? Ne.access(i, t, r) : (i.removeEventListener(e, n, !0), Ne.remove(i, t))
                }
            }
        });
        var Tt = e.location,
            kt = fe.now(),
            St = /\?/;
        fe.parseXML = function(t) {
            var n;
            if (!t || "string" != typeof t) return null;
            try {
                n = (new e.DOMParser).parseFromString(t, "text/xml")
            } catch (e) {
                n = void 0
            }
            return n && !n.getElementsByTagName("parsererror").length || fe.error("Invalid XML: " + t), n
        };
        var Et = /\[\]$/,
            Pt = /\r?\n/g,
            At = /^(?:submit|button|image|reset|file)$/i,
            Ot = /^(?:input|select|textarea|keygen)/i;
        fe.param = function(e, t) {
            var n, i = [],
                r = function(e, t) {
                    var n = fe.isFunction(t) ? t() : t;
                    i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                };
            if (fe.isArray(e) || e.jquery && !fe.isPlainObject(e)) fe.each(e, function() {
                r(this.name, this.value)
            });
            else
                for (n in e) Q(n, e[n], t, r);
            return i.join("&")
        }, fe.fn.extend({
            serialize: function() {
                return fe.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = fe.prop(this, "elements");
                    return e ? fe.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !fe(this).is(":disabled") && Ot.test(this.nodeName) && !At.test(e) && (this.checked || !We.test(e))
                }).map(function(e, t) {
                    var n = fe(this).val();
                    return null == n ? null : fe.isArray(n) ? fe.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Pt, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Pt, "\r\n")
                    }
                }).get()
            }
        });
        var Dt = /%20/g,
            qt = /#.*$/,
            jt = /([?&])_=[^&]*/,
            Nt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            It = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Lt = /^(?:GET|HEAD)$/,
            Mt = /^\/\//,
            Ht = {},
            _t = {},
            Ft = "*/".concat("*"),
            $t = K.createElement("a");
        $t.href = Tt.href, fe.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Tt.href,
                type: "GET",
                isLocal: It.test(Tt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ft,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": fe.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? Y(Y(e, fe.ajaxSettings), t) : Y(fe.ajaxSettings, e)
            },
            ajaxPrefilter: X(Ht),
            ajaxTransport: X(_t),
            ajax: function(t, n) {
                function i(t, n, i, s) {
                    var u, f, p, x, w, C = n;
                    c || (c = !0, l && e.clearTimeout(l), r = void 0, a = s || "", T.readyState = t > 0 ? 4 : 0, u = t >= 200 && t < 300 || 304 === t, i && (x = U(h, T, i)), x = G(h, x, T, u), u ? (h.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (fe.lastModified[o] = w), w = T.getResponseHeader("etag"), w && (fe.etag[o] = w)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = x.state, f = x.data, p = x.error, u = !p)) : (p = C, !t && C || (C = "error", t < 0 && (t = 0))), T.status = t, T.statusText = (n || C) + "", u ? m.resolveWith(v, [f, C, T]) : m.rejectWith(v, [T, C, p]), T.statusCode(b), b = void 0, d && g.trigger(u ? "ajaxSuccess" : "ajaxError", [T, h, u ? f : p]), y.fireWith(v, [T, C]), d && (g.trigger("ajaxComplete", [T, h]), --fe.active || fe.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (n = t, t = void 0), n = n || {};
                var r, o, a, s, l, u, c, d, f, p, h = fe.ajaxSetup({}, n),
                    v = h.context || h,
                    g = h.context && (v.nodeType || v.jquery) ? fe(v) : fe.event,
                    m = fe.Deferred(),
                    y = fe.Callbacks("once memory"),
                    b = h.statusCode || {},
                    x = {},
                    w = {},
                    C = "canceled",
                    T = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (c) {
                                if (!s)
                                    for (s = {}; t = Nt.exec(a);) s[t[1].toLowerCase()] = t[2];
                                t = s[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return c ? a : null
                        },
                        setRequestHeader: function(e, t) {
                            return null == c && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, x[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return null == c && (h.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (c) T.always(e[T.status]);
                                else
                                    for (t in e) b[t] = [b[t], e[t]];
                            return this
                        },
                        abort: function(e) {
                            var t = e || C;
                            return r && r.abort(t), i(0, t), this
                        }
                    };
                if (m.promise(T), h.url = ((t || h.url || Tt.href) + "").replace(Mt, Tt.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(Ae) || [""], null == h.crossDomain) {
                    u = K.createElement("a");
                    try {
                        u.href = h.url, u.href = u.href, h.crossDomain = $t.protocol + "//" + $t.host != u.protocol + "//" + u.host
                    } catch (e) {
                        h.crossDomain = !0
                    }
                }
                if (h.data && h.processData && "string" != typeof h.data && (h.data = fe.param(h.data, h.traditional)), B(Ht, h, n, T), c) return T;
                d = fe.event && h.global, d && 0 === fe.active++ && fe.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Lt.test(h.type), o = h.url.replace(qt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(Dt, "+")) : (p = h.url.slice(o.length), h.data && (o += (St.test(o) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (o = o.replace(jt, ""), p = (St.test(o) ? "&" : "?") + "_=" + kt++ + p), h.url = o + p), h.ifModified && (fe.lastModified[o] && T.setRequestHeader("If-Modified-Since", fe.lastModified[o]), fe.etag[o] && T.setRequestHeader("If-None-Match", fe.etag[o])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", h.contentType), T.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Ft + "; q=0.01" : "") : h.accepts["*"]);
                for (f in h.headers) T.setRequestHeader(f, h.headers[f]);
                if (h.beforeSend && (h.beforeSend.call(v, T, h) === !1 || c)) return T.abort();
                if (C = "abort", y.add(h.complete), T.done(h.success), T.fail(h.error), r = B(_t, h, n, T)) {
                    if (T.readyState = 1, d && g.trigger("ajaxSend", [T, h]), c) return T;
                    h.async && h.timeout > 0 && (l = e.setTimeout(function() {
                        T.abort("timeout")
                    }, h.timeout));
                    try {
                        c = !1, r.send(x, i)
                    } catch (e) {
                        if (c) throw e;
                        i(-1, e)
                    }
                } else i(-1, "No Transport");
                return T
            },
            getJSON: function(e, t, n) {
                return fe.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return fe.get(e, void 0, t, "script")
            }
        }), fe.each(["get", "post"], function(e, t) {
            fe[t] = function(e, n, i, r) {
                return fe.isFunction(n) && (r = r || i, i = n, n = void 0), fe.ajax(fe.extend({
                    url: e,
                    type: t,
                    dataType: r,
                    data: n,
                    success: i
                }, fe.isPlainObject(e) && e))
            }
        }), fe._evalUrl = function(e) {
            return fe.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0
            })
        }, fe.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (fe.isFunction(e) && (e = e.call(this[0])), t = fe(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this
            },
            wrapInner: function(e) {
                return fe.isFunction(e) ? this.each(function(t) {
                    fe(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = fe(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = fe.isFunction(e);
                return this.each(function(n) {
                    fe(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each(function() {
                    fe(this).replaceWith(this.childNodes)
                }), this
            }
        }), fe.expr.pseudos.hidden = function(e) {
            return !fe.expr.pseudos.visible(e)
        }, fe.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }, fe.ajaxSettings.xhr = function() {
            try {
                return new e.XMLHttpRequest
            } catch (e) {}
        };
        var Rt = {
                0: 200,
                1223: 204
            },
            zt = fe.ajaxSettings.xhr();
        ce.cors = !!zt && "withCredentials" in zt, ce.ajax = zt = !!zt, fe.ajaxTransport(function(t) {
            var n, i;
            if (ce.cors || zt && !t.crossDomain) return {
                send: function(r, o) {
                    var a, s = t.xhr();
                    if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (a in t.xhrFields) s[a] = t.xhrFields[a];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                    for (a in r) s.setRequestHeader(a, r[a]);
                    n = function(e) {
                        return function() {
                            n && (n = i = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Rt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                binary: s.response
                            } : {
                                text: s.responseText
                            }, s.getAllResponseHeaders()))
                        }
                    }, s.onload = n(), i = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = i : s.onreadystatechange = function() {
                        4 === s.readyState && e.setTimeout(function() {
                            n && i()
                        })
                    }, n = n("abort");
                    try {
                        s.send(t.hasContent && t.data || null)
                    } catch (e) {
                        if (n) throw e
                    }
                },
                abort: function() {
                    n && n()
                }
            }
        }), fe.ajaxPrefilter(function(e) {
            e.crossDomain && (e.contents.script = !1)
        }), fe.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return fe.globalEval(e), e
                }
            }
        }), fe.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), fe.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function(i, r) {
                        t = fe("<script>").prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(e) {
                            t.remove(), n = null, e && r("error" === e.type ? 404 : 200, e.type)
                        }), K.head.appendChild(t[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var Wt = [],
            Vt = /(=)\?(?=&|$)|\?\?/;
        fe.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Wt.pop() || fe.expando + "_" + kt++;
                return this[e] = !0, e
            }
        }), fe.ajaxPrefilter("json jsonp", function(t, n, i) {
            var r, o, a, s = t.jsonp !== !1 && (Vt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(t.data) && "data");
            if (s || "jsonp" === t.dataTypes[0]) return r = t.jsonpCallback = fe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Vt, "$1" + r) : t.jsonp !== !1 && (t.url += (St.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
                return a || fe.error(r + " was not called"), a[0]
            }, t.dataTypes[0] = "json", o = e[r], e[r] = function() {
                a = arguments
            }, i.always(function() {
                void 0 === o ? fe(e).removeProp(r) : e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, Wt.push(r)), a && fe.isFunction(o) && o(a[0]), a = o = void 0
            }), "script"
        }), ce.createHTMLDocument = function() {
            var e = K.implementation.createHTMLDocument("").body;
            return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
        }(), fe.parseHTML = function(e, t, n) {
            if ("string" != typeof e) return [];
            "boolean" == typeof t && (n = t, t = !1);
            var i, r, o;
            return t || (ce.createHTMLDocument ? (t = K.implementation.createHTMLDocument(""), i = t.createElement("base"), i.href = K.location.href, t.head.appendChild(i)) : t = K), r = we.exec(e), o = !n && [], r ? [t.createElement(r[1])] : (r = y([e], t, o), o && o.length && fe(o).remove(), fe.merge([], r.childNodes))
        }, fe.fn.load = function(e, t, n) {
            var i, r, o, a = this,
                s = e.indexOf(" ");
            return s > -1 && (i = fe.trim(e.slice(s)), e = e.slice(0, s)), fe.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && fe.ajax({
                url: e,
                type: r || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments, a.html(i ? fe("<div>").append(fe.parseHTML(e)).find(i) : e)
            }).always(n && function(e, t) {
                a.each(function() {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }), this
        }, fe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            fe.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), fe.expr.pseudos.animated = function(e) {
            return fe.grep(fe.timers, function(t) {
                return e === t.elem
            }).length
        }, fe.offset = {
            setOffset: function(e, t, n) {
                var i, r, o, a, s, l, u, c = fe.css(e, "position"),
                    d = fe(e),
                    f = {};
                "static" === c && (e.style.position = "relative"), s = d.offset(), o = fe.css(e, "top"), l = fe.css(e, "left"), u = ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1, u ? (i = d.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), fe.isFunction(t) && (t = t.call(e, n, fe.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + r), "using" in t ? t.using.call(e, f) : d.css(f)
            }
        }, fe.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                    fe.offset.setOffset(this, e, t)
                });
                var t, n, i, r, o = this[0];
                return o ? o.getClientRects().length ? (i = o.getBoundingClientRect(), i.width || i.height ? (r = o.ownerDocument, n = J(r), t = r.documentElement, {
                    top: i.top + n.pageYOffset - t.clientTop,
                    left: i.left + n.pageXOffset - t.clientLeft
                }) : i) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, n = this[0],
                        i = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === fe.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), fe.nodeName(e[0], "html") || (i = e.offset()), i = {
                        top: i.top + fe.css(e[0], "borderTopWidth", !0),
                        left: i.left + fe.css(e[0], "borderLeftWidth", !0)
                    }), {
                        top: t.top - i.top - fe.css(n, "marginTop", !0),
                        left: t.left - i.left - fe.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && "static" === fe.css(e, "position");) e = e.offsetParent;
                    return e || Ye
                })
            }
        }), fe.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = "pageYOffset" === t;
            fe.fn[e] = function(i) {
                return qe(this, function(e, i, r) {
                    var o = J(e);
                    return void 0 === r ? o ? o[t] : e[i] : void(o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : e[i] = r)
                }, e, i, arguments.length)
            }
        }), fe.each(["top", "left"], function(e, t) {
            fe.cssHooks[t] = q(ce.pixelPosition, function(e, n) {
                if (n) return n = D(e, t), rt.test(n) ? fe(e).position()[t] + "px" : n
            })
        }), fe.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            fe.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, i) {
                fe.fn[i] = function(r, o) {
                    var a = arguments.length && (n || "boolean" != typeof r),
                        s = n || (r === !0 || o === !0 ? "margin" : "border");
                    return qe(this, function(t, n, r) {
                        var o;
                        return fe.isWindow(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === r ? fe.css(t, n, s) : fe.style(t, n, r, s)
                    }, t, a ? r : void 0, a)
                }
            })
        }), fe.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }), fe.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() {
            return fe
        });
        var Qt = e.jQuery,
            Xt = e.$;
        return fe.noConflict = function(t) {
            return e.$ === fe && (e.$ = Xt), t && e.jQuery === fe && (e.jQuery = Qt), fe
        }, t || (e.jQuery = e.$ = fe), fe
    }), "undefined" == typeof jQuery) {
    var jQuery;
    jQuery = "function" == typeof require ? $ = require("jquery") : $
}
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(e, t, n, i, r) {
            return jQuery.easing[jQuery.easing.def](e, t, n, i, r)
        },
        easeInQuad: function(e, t, n, i, r) {
            return i * (t /= r) * t + n
        },
        easeOutQuad: function(e, t, n, i, r) {
            return -i * (t /= r) * (t - 2) + n
        },
        easeInOutQuad: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t + n : -i / 2 * (--t * (t - 2) - 1) + n
        },
        easeInCubic: function(e, t, n, i, r) {
            return i * (t /= r) * t * t + n
        },
        easeOutCubic: function(e, t, n, i, r) {
            return i * ((t = t / r - 1) * t * t + 1) + n
        },
        easeInOutCubic: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t * t + n : i / 2 * ((t -= 2) * t * t + 2) + n
        },
        easeInQuart: function(e, t, n, i, r) {
            return i * (t /= r) * t * t * t + n
        },
        easeOutQuart: function(e, t, n, i, r) {
            return -i * ((t = t / r - 1) * t * t * t - 1) + n
        },
        easeInOutQuart: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + n : -i / 2 * ((t -= 2) * t * t * t - 2) + n
        },
        easeInQuint: function(e, t, n, i, r) {
            return i * (t /= r) * t * t * t * t + n
        },
        easeOutQuint: function(e, t, n, i, r) {
            return i * ((t = t / r - 1) * t * t * t * t + 1) + n
        },
        easeInOutQuint: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + n : i / 2 * ((t -= 2) * t * t * t * t + 2) + n
        },
        easeInSine: function(e, t, n, i, r) {
            return -i * Math.cos(t / r * (Math.PI / 2)) + i + n
        },
        easeOutSine: function(e, t, n, i, r) {
            return i * Math.sin(t / r * (Math.PI / 2)) + n
        },
        easeInOutSine: function(e, t, n, i, r) {
            return -i / 2 * (Math.cos(Math.PI * t / r) - 1) + n
        },
        easeInExpo: function(e, t, n, i, r) {
            return 0 == t ? n : i * Math.pow(2, 10 * (t / r - 1)) + n
        },
        easeOutExpo: function(e, t, n, i, r) {
            return t == r ? n + i : i * (-Math.pow(2, -10 * t / r) + 1) + n
        },
        easeInOutExpo: function(e, t, n, i, r) {
            return 0 == t ? n : t == r ? n + i : (t /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n : i / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        },
        easeInCirc: function(e, t, n, i, r) {
            return -i * (Math.sqrt(1 - (t /= r) * t) - 1) + n
        },
        easeOutCirc: function(e, t, n, i, r) {
            return i * Math.sqrt(1 - (t = t / r - 1) * t) + n
        },
        easeInOutCirc: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        },
        easeInElastic: function(e, t, n, i, r) {
            var o = 1.70158,
                a = 0,
                s = i;
            if (0 == t) return n;
            if (1 == (t /= r)) return n + i;
            if (a || (a = .3 * r), s < Math.abs(i)) {
                s = i;
                var o = a / 4
            } else var o = a / (2 * Math.PI) * Math.asin(i / s);
            return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / a)) + n
        },
        easeOutElastic: function(e, t, n, i, r) {
            var o = 1.70158,
                a = 0,
                s = i;
            if (0 == t) return n;
            if (1 == (t /= r)) return n + i;
            if (a || (a = .3 * r), s < Math.abs(i)) {
                s = i;
                var o = a / 4
            } else var o = a / (2 * Math.PI) * Math.asin(i / s);
            return s * Math.pow(2, -10 * t) * Math.sin((t * r - o) * (2 * Math.PI) / a) + i + n
        },
        easeInOutElastic: function(e, t, n, i, r) {
            var o = 1.70158,
                a = 0,
                s = i;
            if (0 == t) return n;
            if (2 == (t /= r / 2)) return n + i;
            if (a || (a = r * (.3 * 1.5)), s < Math.abs(i)) {
                s = i;
                var o = a / 4
            } else var o = a / (2 * Math.PI) * Math.asin(i / s);
            return 1 > t ? -.5 * (s * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / a)) + n : s * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / a) * .5 + i + n
        },
        easeInBack: function(e, t, n, i, r, o) {
            return void 0 == o && (o = 1.70158), i * (t /= r) * t * ((o + 1) * t - o) + n
        },
        easeOutBack: function(e, t, n, i, r, o) {
            return void 0 == o && (o = 1.70158), i * ((t = t / r - 1) * t * ((o + 1) * t + o) + 1) + n
        },
        easeInOutBack: function(e, t, n, i, r, o) {
            return void 0 == o && (o = 1.70158), (t /= r / 2) < 1 ? i / 2 * (t * t * (((o *= 1.525) + 1) * t - o)) + n : i / 2 * ((t -= 2) * t * (((o *= 1.525) + 1) * t + o) + 2) + n
        },
        easeInBounce: function(e, t, n, i, r) {
            return i - jQuery.easing.easeOutBounce(e, r - t, 0, i, r) + n
        },
        easeOutBounce: function(e, t, n, i, r) {
            return (t /= r) < 1 / 2.75 ? i * (7.5625 * t * t) + n : 2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : 2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        },
        easeInOutBounce: function(e, t, n, i, r) {
            return r / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, r) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - r, 0, i, r) + .5 * i + n
        }
    }), jQuery.extend(jQuery.easing, {
        easeInOutMaterial: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t + n : i / 4 * ((t -= 2) * t * t + 2) + n
        }
    }), jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (! function(e) {
        function t(e) {
            var t = e.length,
                i = n.type(e);
            return "function" !== i && !n.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e))
        }
        if (!e.jQuery) {
            var n = function(e, t) {
                return new n.fn.init(e, t)
            };
            n.isWindow = function(e) {
                return null != e && e == e.window
            }, n.type = function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? r[a.call(e)] || "object" : typeof e
            }, n.isArray = Array.isArray || function(e) {
                return "array" === n.type(e)
            }, n.isPlainObject = function(e) {
                var t;
                if (!e || "object" !== n.type(e) || e.nodeType || n.isWindow(e)) return !1;
                try {
                    if (e.constructor && !o.call(e, "constructor") && !o.call(e.constructor.prototype, "isPrototypeOf")) return !1
                } catch (e) {
                    return !1
                }
                for (t in e);
                return void 0 === t || o.call(e, t)
            }, n.each = function(e, n, i) {
                var r, o = 0,
                    a = e.length,
                    s = t(e);
                if (i) {
                    if (s)
                        for (; a > o && (r = n.apply(e[o], i), r !== !1); o++);
                    else
                        for (o in e)
                            if (r = n.apply(e[o], i), r === !1) break
                } else if (s)
                    for (; a > o && (r = n.call(e[o], o, e[o]), r !== !1); o++);
                else
                    for (o in e)
                        if (r = n.call(e[o], o, e[o]), r === !1) break;
                return e
            }, n.data = function(e, t, r) {
                if (void 0 === r) {
                    var o = e[n.expando],
                        a = o && i[o];
                    if (void 0 === t) return a;
                    if (a && t in a) return a[t]
                } else if (void 0 !== t) {
                    var o = e[n.expando] || (e[n.expando] = ++n.uuid);
                    return i[o] = i[o] || {}, i[o][t] = r, r
                }
            }, n.removeData = function(e, t) {
                var r = e[n.expando],
                    o = r && i[r];
                o && n.each(t, function(e, t) {
                    delete o[t]
                })
            }, n.extend = function() {
                var e, t, i, r, o, a, s = arguments[0] || {},
                    l = 1,
                    u = arguments.length,
                    c = !1;
                for ("boolean" == typeof s && (c = s, s = arguments[l] || {}, l++), "object" != typeof s && "function" !== n.type(s) && (s = {}), l === u && (s = this, l--); u > l; l++)
                    if (null != (o = arguments[l]))
                        for (r in o) e = s[r], i = o[r], s !== i && (c && i && (n.isPlainObject(i) || (t = n.isArray(i))) ? (t ? (t = !1, a = e && n.isArray(e) ? e : []) : a = e && n.isPlainObject(e) ? e : {}, s[r] = n.extend(c, a, i)) : void 0 !== i && (s[r] = i));
                return s
            }, n.queue = function(e, i, r) {
                function o(e, n) {
                    var i = n || [];
                    return null != e && (t(Object(e)) ? ! function(e, t) {
                        for (var n = +t.length, i = 0, r = e.length; n > i;) e[r++] = t[i++];
                        if (n !== n)
                            for (; void 0 !== t[i];) e[r++] = t[i++];
                        return e.length = r, e
                    }(i, "string" == typeof e ? [e] : e) : [].push.call(i, e)), i
                }
                if (e) {
                    i = (i || "fx") + "queue";
                    var a = n.data(e, i);
                    return r ? (!a || n.isArray(r) ? a = n.data(e, i, o(r)) : a.push(r), a) : a || []
                }
            }, n.dequeue = function(e, t) {
                n.each(e.nodeType ? [e] : e, function(e, i) {
                    t = t || "fx";
                    var r = n.queue(i, t),
                        o = r.shift();
                    "inprogress" === o && (o = r.shift()), o && ("fx" === t && r.unshift("inprogress"), o.call(i, function() {
                        n.dequeue(i, t)
                    }))
                })
            }, n.fn = n.prototype = {
                init: function(e) {
                    if (e.nodeType) return this[0] = e, this;
                    throw new Error("Not a DOM node.")
                },
                offset: function() {
                    var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                        top: 0,
                        left: 0
                    };
                    return {
                        top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                        left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                    }
                },
                position: function() {
                    function e() {
                        for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
                        return e || document
                    }
                    var t = this[0],
                        e = e.apply(t),
                        i = this.offset(),
                        r = /^(?:body|html)$/i.test(e.nodeName) ? {
                            top: 0,
                            left: 0
                        } : n(e).offset();
                    return i.top -= parseFloat(t.style.marginTop) || 0, i.left -= parseFloat(t.style.marginLeft) || 0,
                        e.style && (r.top += parseFloat(e.style.borderTopWidth) || 0, r.left += parseFloat(e.style.borderLeftWidth) || 0), {
                            top: i.top - r.top,
                            left: i.left - r.left
                        }
                }
            };
            var i = {};
            n.expando = "velocity" + (new Date).getTime(), n.uuid = 0;
            for (var r = {}, o = r.hasOwnProperty, a = r.toString, s = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < s.length; l++) r["[object " + s[l] + "]"] = s[l].toLowerCase();
            n.fn.init.prototype = n.fn, e.Velocity = {
                Utilities: n
            }
        }
    }(window), function(e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
    }(function() {
        return function(e, t, n, i) {
            function r(e) {
                for (var t = -1, n = e ? e.length : 0, i = []; ++t < n;) {
                    var r = e[t];
                    r && i.push(r)
                }
                return i
            }

            function o(e) {
                return v.isWrapped(e) ? e = [].slice.call(e) : v.isNode(e) && (e = [e]), e
            }

            function a(e) {
                var t = f.data(e, "velocity");
                return null === t ? i : t
            }

            function s(e) {
                return function(t) {
                    return Math.round(t * e) * (1 / e)
                }
            }

            function l(e, n, i, r) {
                function o(e, t) {
                    return 1 - 3 * t + 3 * e
                }

                function a(e, t) {
                    return 3 * t - 6 * e
                }

                function s(e) {
                    return 3 * e
                }

                function l(e, t, n) {
                    return ((o(t, n) * e + a(t, n)) * e + s(t)) * e
                }

                function u(e, t, n) {
                    return 3 * o(t, n) * e * e + 2 * a(t, n) * e + s(t)
                }

                function c(t, n) {
                    for (var r = 0; v > r; ++r) {
                        var o = u(n, e, i);
                        if (0 === o) return n;
                        var a = l(n, e, i) - t;
                        n -= a / o
                    }
                    return n
                }

                function d() {
                    for (var t = 0; b > t; ++t) T[t] = l(t * x, e, i)
                }

                function f(t, n, r) {
                    var o, a, s = 0;
                    do a = n + (r - n) / 2, o = l(a, e, i) - t, o > 0 ? r = a : n = a; while (Math.abs(o) > m && ++s < y);
                    return a
                }

                function p(t) {
                    for (var n = 0, r = 1, o = b - 1; r != o && T[r] <= t; ++r) n += x;
                    --r;
                    var a = (t - T[r]) / (T[r + 1] - T[r]),
                        s = n + a * x,
                        l = u(s, e, i);
                    return l >= g ? c(t, s) : 0 == l ? s : f(t, n, n + x)
                }

                function h() {
                    k = !0, (e != n || i != r) && d()
                }
                var v = 4,
                    g = .001,
                    m = 1e-7,
                    y = 10,
                    b = 11,
                    x = 1 / (b - 1),
                    w = "Float32Array" in t;
                if (4 !== arguments.length) return !1;
                for (var C = 0; 4 > C; ++C)
                    if ("number" != typeof arguments[C] || isNaN(arguments[C]) || !isFinite(arguments[C])) return !1;
                e = Math.min(e, 1), i = Math.min(i, 1), e = Math.max(e, 0), i = Math.max(i, 0);
                var T = w ? new Float32Array(b) : new Array(b),
                    k = !1,
                    S = function(t) {
                        return k || h(), e === n && i === r ? t : 0 === t ? 0 : 1 === t ? 1 : l(p(t), n, r)
                    };
                S.getControlPoints = function() {
                    return [{
                        x: e,
                        y: n
                    }, {
                        x: i,
                        y: r
                    }]
                };
                var E = "generateBezier(" + [e, n, i, r] + ")";
                return S.toString = function() {
                    return E
                }, S
            }

            function u(e, t) {
                var n = e;
                return v.isString(e) ? b.Easings[e] || (n = !1) : n = v.isArray(e) && 1 === e.length ? s.apply(null, e) : v.isArray(e) && 2 === e.length ? x.apply(null, e.concat([t])) : !(!v.isArray(e) || 4 !== e.length) && l.apply(null, e), n === !1 && (n = b.Easings[b.defaults.easing] ? b.defaults.easing : y), n
            }

            function c(e) {
                if (e) {
                    var t = (new Date).getTime(),
                        n = b.State.calls.length;
                    n > 1e4 && (b.State.calls = r(b.State.calls));
                    for (var o = 0; n > o; o++)
                        if (b.State.calls[o]) {
                            var s = b.State.calls[o],
                                l = s[0],
                                u = s[2],
                                p = s[3],
                                h = !!p,
                                g = null;
                            p || (p = b.State.calls[o][3] = t - 16);
                            for (var m = Math.min((t - p) / u.duration, 1), y = 0, x = l.length; x > y; y++) {
                                var C = l[y],
                                    k = C.element;
                                if (a(k)) {
                                    var S = !1;
                                    if (u.display !== i && null !== u.display && "none" !== u.display) {
                                        if ("flex" === u.display) {
                                            var E = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                            f.each(E, function(e, t) {
                                                w.setPropertyValue(k, "display", t)
                                            })
                                        }
                                        w.setPropertyValue(k, "display", u.display)
                                    }
                                    u.visibility !== i && "hidden" !== u.visibility && w.setPropertyValue(k, "visibility", u.visibility);
                                    for (var P in C)
                                        if ("element" !== P) {
                                            var A, O = C[P],
                                                D = v.isString(O.easing) ? b.Easings[O.easing] : O.easing;
                                            if (1 === m) A = O.endValue;
                                            else {
                                                var q = O.endValue - O.startValue;
                                                if (A = O.startValue + q * D(m, u, q), !h && A === O.currentValue) continue
                                            }
                                            if (O.currentValue = A, "tween" === P) g = A;
                                            else {
                                                if (w.Hooks.registered[P]) {
                                                    var j = w.Hooks.getRoot(P),
                                                        N = a(k).rootPropertyValueCache[j];
                                                    N && (O.rootPropertyValue = N)
                                                }
                                                var I = w.setPropertyValue(k, P, O.currentValue + (0 === parseFloat(A) ? "" : O.unitType), O.rootPropertyValue, O.scrollData);
                                                w.Hooks.registered[P] && (a(k).rootPropertyValueCache[j] = w.Normalizations.registered[j] ? w.Normalizations.registered[j]("extract", null, I[1]) : I[1]), "transform" === I[0] && (S = !0)
                                            }
                                        }
                                    u.mobileHA && a(k).transformCache.translate3d === i && (a(k).transformCache.translate3d = "(0px, 0px, 0px)", S = !0), S && w.flushTransformCache(k)
                                }
                            }
                            u.display !== i && "none" !== u.display && (b.State.calls[o][2].display = !1), u.visibility !== i && "hidden" !== u.visibility && (b.State.calls[o][2].visibility = !1), u.progress && u.progress.call(s[1], s[1], m, Math.max(0, p + u.duration - t), p, g), 1 === m && d(o)
                        }
                }
                b.State.isTicking && T(c)
            }

            function d(e, t) {
                if (!b.State.calls[e]) return !1;
                for (var n = b.State.calls[e][0], r = b.State.calls[e][1], o = b.State.calls[e][2], s = b.State.calls[e][4], l = !1, u = 0, c = n.length; c > u; u++) {
                    var d = n[u].element;
                    if (t || o.loop || ("none" === o.display && w.setPropertyValue(d, "display", o.display), "hidden" === o.visibility && w.setPropertyValue(d, "visibility", o.visibility)), o.loop !== !0 && (f.queue(d)[1] === i || !/\.velocityQueueEntryFlag/i.test(f.queue(d)[1])) && a(d)) {
                        a(d).isAnimating = !1, a(d).rootPropertyValueCache = {};
                        var p = !1;
                        f.each(w.Lists.transforms3D, function(e, t) {
                            var n = /^scale/.test(t) ? 1 : 0,
                                r = a(d).transformCache[t];
                            a(d).transformCache[t] !== i && new RegExp("^\\(" + n + "[^.]").test(r) && (p = !0, delete a(d).transformCache[t])
                        }), o.mobileHA && (p = !0, delete a(d).transformCache.translate3d), p && w.flushTransformCache(d), w.Values.removeClass(d, "velocity-animating")
                    }
                    if (!t && o.complete && !o.loop && u === c - 1) try {
                        o.complete.call(r, r)
                    } catch (e) {
                        setTimeout(function() {
                            throw e
                        }, 1)
                    }
                    s && o.loop !== !0 && s(r), a(d) && o.loop === !0 && !t && (f.each(a(d).tweensContainer, function(e, t) {
                        /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                    }), b(d, "reverse", {
                        loop: !0,
                        delay: o.delay
                    })), o.queue !== !1 && f.dequeue(d, o.queue)
                }
                b.State.calls[e] = !1;
                for (var h = 0, v = b.State.calls.length; v > h; h++)
                    if (b.State.calls[h] !== !1) {
                        l = !0;
                        break
                    }
                l === !1 && (b.State.isTicking = !1, delete b.State.calls, b.State.calls = [])
            }
            var f, p = function() {
                    if (n.documentMode) return n.documentMode;
                    for (var e = 7; e > 4; e--) {
                        var t = n.createElement("div");
                        if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
                    }
                    return i
                }(),
                h = function() {
                    var e = 0;
                    return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                        var n, i = (new Date).getTime();
                        return n = Math.max(0, 16 - (i - e)), e = i + n, setTimeout(function() {
                            t(i + n)
                        }, n)
                    }
                }(),
                v = {
                    isString: function(e) {
                        return "string" == typeof e
                    },
                    isArray: Array.isArray || function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    },
                    isFunction: function(e) {
                        return "[object Function]" === Object.prototype.toString.call(e)
                    },
                    isNode: function(e) {
                        return e && e.nodeType
                    },
                    isNodeList: function(e) {
                        return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== i && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
                    },
                    isWrapped: function(e) {
                        return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
                    },
                    isSVG: function(e) {
                        return t.SVGElement && e instanceof t.SVGElement
                    },
                    isEmptyObject: function(e) {
                        for (var t in e) return !1;
                        return !0
                    }
                },
                g = !1;
            if (e.fn && e.fn.jquery ? (f = e, g = !0) : f = t.Velocity.Utilities, 8 >= p && !g) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
            if (7 >= p) return void(jQuery.fn.velocity = jQuery.fn.animate);
            var m = 400,
                y = "swing",
                b = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: t.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: n.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: f,
                    Redirects: {},
                    Easings: {},
                    Promise: t.Promise,
                    defaults: {
                        queue: "",
                        duration: m,
                        easing: y,
                        begin: i,
                        complete: i,
                        progress: i,
                        display: i,
                        visibility: i,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function(e) {
                        f.data(e, "velocity", {
                            isSVG: v.isSVG(e),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    },
                    hook: null,
                    mock: !1,
                    version: {
                        major: 1,
                        minor: 2,
                        patch: 2
                    },
                    debug: !1
                };
            t.pageYOffset !== i ? (b.State.scrollAnchor = t, b.State.scrollPropertyLeft = "pageXOffset", b.State.scrollPropertyTop = "pageYOffset") : (b.State.scrollAnchor = n.documentElement || n.body.parentNode || n.body, b.State.scrollPropertyLeft = "scrollLeft", b.State.scrollPropertyTop = "scrollTop");
            var x = function() {
                function e(e) {
                    return -e.tension * e.x - e.friction * e.v
                }

                function t(t, n, i) {
                    var r = {
                        x: t.x + i.dx * n,
                        v: t.v + i.dv * n,
                        tension: t.tension,
                        friction: t.friction
                    };
                    return {
                        dx: r.v,
                        dv: e(r)
                    }
                }

                function n(n, i) {
                    var r = {
                            dx: n.v,
                            dv: e(n)
                        },
                        o = t(n, .5 * i, r),
                        a = t(n, .5 * i, o),
                        s = t(n, i, a),
                        l = 1 / 6 * (r.dx + 2 * (o.dx + a.dx) + s.dx),
                        u = 1 / 6 * (r.dv + 2 * (o.dv + a.dv) + s.dv);
                    return n.x = n.x + l * i, n.v = n.v + u * i, n
                }
                return function e(t, i, r) {
                    var o, a, s, l = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        },
                        u = [0],
                        c = 0,
                        d = 1e-4,
                        f = .016;
                    for (t = parseFloat(t) || 500, i = parseFloat(i) || 20, r = r || null, l.tension = t, l.friction = i, o = null !== r, o ? (c = e(t, i), a = c / r * f) : a = f; s = n(s || l, a), u.push(1 + s.x), c += 16, Math.abs(s.x) > d && Math.abs(s.v) > d;);
                    return o ? function(e) {
                        return u[e * (u.length - 1) | 0]
                    } : c
                }
            }();
            b.Easings = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                spring: function(e) {
                    return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
                }
            }, f.each([
                ["ease", [.25, .1, .25, 1]],
                ["ease-in", [.42, 0, 1, 1]],
                ["ease-out", [0, 0, .58, 1]],
                ["ease-in-out", [.42, 0, .58, 1]],
                ["easeInSine", [.47, 0, .745, .715]],
                ["easeOutSine", [.39, .575, .565, 1]],
                ["easeInOutSine", [.445, .05, .55, .95]],
                ["easeInQuad", [.55, .085, .68, .53]],
                ["easeOutQuad", [.25, .46, .45, .94]],
                ["easeInOutQuad", [.455, .03, .515, .955]],
                ["easeInCubic", [.55, .055, .675, .19]],
                ["easeOutCubic", [.215, .61, .355, 1]],
                ["easeInOutCubic", [.645, .045, .355, 1]],
                ["easeInQuart", [.895, .03, .685, .22]],
                ["easeOutQuart", [.165, .84, .44, 1]],
                ["easeInOutQuart", [.77, 0, .175, 1]],
                ["easeInQuint", [.755, .05, .855, .06]],
                ["easeOutQuint", [.23, 1, .32, 1]],
                ["easeInOutQuint", [.86, 0, .07, 1]],
                ["easeInExpo", [.95, .05, .795, .035]],
                ["easeOutExpo", [.19, 1, .22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [.6, .04, .98, .335]],
                ["easeOutCirc", [.075, .82, .165, 1]],
                ["easeInOutCirc", [.785, .135, .15, .86]]
            ], function(e, t) {
                b.Easings[t[0]] = l.apply(null, t[1])
            });
            var w = b.CSS = {
                RegEx: {
                    isHex: /^#([A-f\d]{3}){1,2}$/i,
                    valueUnwrap: /^[A-z]+\((.*)\)$/i,
                    wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                    valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                },
                Lists: {
                    colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                    transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                    transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
                },
                Hooks: {
                    templates: {
                        textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                        boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                        clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                        backgroundPosition: ["X Y", "0% 0%"],
                        transformOrigin: ["X Y Z", "50% 50% 0px"],
                        perspectiveOrigin: ["X Y", "50% 50%"]
                    },
                    registered: {},
                    register: function() {
                        for (var e = 0; e < w.Lists.colors.length; e++) {
                            var t = "color" === w.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                            w.Hooks.templates[w.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                        }
                        var n, i, r;
                        if (p)
                            for (n in w.Hooks.templates) {
                                i = w.Hooks.templates[n], r = i[0].split(" ");
                                var o = i[1].match(w.RegEx.valueSplit);
                                "Color" === r[0] && (r.push(r.shift()), o.push(o.shift()), w.Hooks.templates[n] = [r.join(" "), o.join(" ")])
                            }
                        for (n in w.Hooks.templates) {
                            i = w.Hooks.templates[n], r = i[0].split(" ");
                            for (var e in r) {
                                var a = n + r[e],
                                    s = e;
                                w.Hooks.registered[a] = [n, s]
                            }
                        }
                    },
                    getRoot: function(e) {
                        var t = w.Hooks.registered[e];
                        return t ? t[0] : e
                    },
                    cleanRootPropertyValue: function(e, t) {
                        return w.RegEx.valueUnwrap.test(t) && (t = t.match(w.RegEx.valueUnwrap)[1]), w.Values.isCSSNullValue(t) && (t = w.Hooks.templates[e][1]), t
                    },
                    extractValue: function(e, t) {
                        var n = w.Hooks.registered[e];
                        if (n) {
                            var i = n[0],
                                r = n[1];
                            return t = w.Hooks.cleanRootPropertyValue(i, t), t.toString().match(w.RegEx.valueSplit)[r]
                        }
                        return t
                    },
                    injectValue: function(e, t, n) {
                        var i = w.Hooks.registered[e];
                        if (i) {
                            var r, o, a = i[0],
                                s = i[1];
                            return n = w.Hooks.cleanRootPropertyValue(a, n), r = n.toString().match(w.RegEx.valueSplit), r[s] = t, o = r.join(" ")
                        }
                        return n
                    }
                },
                Normalizations: {
                    registered: {
                        clip: function(e, t, n) {
                            switch (e) {
                                case "name":
                                    return "clip";
                                case "extract":
                                    var i;
                                    return w.RegEx.wrappedValueAlreadyExtracted.test(n) ? i = n : (i = n.toString().match(w.RegEx.valueUnwrap), i = i ? i[1].replace(/,(\s+)?/g, " ") : n), i;
                                case "inject":
                                    return "rect(" + n + ")"
                            }
                        },
                        blur: function(e, t, n) {
                            switch (e) {
                                case "name":
                                    return b.State.isFirefox ? "filter" : "-webkit-filter";
                                case "extract":
                                    var i = parseFloat(n);
                                    if (!i && 0 !== i) {
                                        var r = n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                        i = r ? r[1] : 0
                                    }
                                    return i;
                                case "inject":
                                    return parseFloat(n) ? "blur(" + n + ")" : "none"
                            }
                        },
                        opacity: function(e, t, n) {
                            if (8 >= p) switch (e) {
                                case "name":
                                    return "filter";
                                case "extract":
                                    var i = n.toString().match(/alpha\(opacity=(.*)\)/i);
                                    return n = i ? i[1] / 100 : 1;
                                case "inject":
                                    return t.style.zoom = 1, parseFloat(n) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(n), 10) + ")"
                            } else switch (e) {
                                case "name":
                                    return "opacity";
                                case "extract":
                                    return n;
                                case "inject":
                                    return n
                            }
                        }
                    },
                    register: function() {
                        9 >= p || b.State.isGingerbread || (w.Lists.transformsBase = w.Lists.transformsBase.concat(w.Lists.transforms3D));
                        for (var e = 0; e < w.Lists.transformsBase.length; e++) ! function() {
                            var t = w.Lists.transformsBase[e];
                            w.Normalizations.registered[t] = function(e, n, r) {
                                switch (e) {
                                    case "name":
                                        return "transform";
                                    case "extract":
                                        return a(n) === i || a(n).transformCache[t] === i ? /^scale/i.test(t) ? 1 : 0 : a(n).transformCache[t].replace(/[()]/g, "");
                                    case "inject":
                                        var o = !1;
                                        switch (t.substr(0, t.length - 1)) {
                                            case "translate":
                                                o = !/(%|px|em|rem|vw|vh|\d)$/i.test(r);
                                                break;
                                            case "scal":
                                            case "scale":
                                                b.State.isAndroid && a(n).transformCache[t] === i && 1 > r && (r = 1), o = !/(\d)$/i.test(r);
                                                break;
                                            case "skew":
                                                o = !/(deg|\d)$/i.test(r);
                                                break;
                                            case "rotate":
                                                o = !/(deg|\d)$/i.test(r)
                                        }
                                        return o || (a(n).transformCache[t] = "(" + r + ")"), a(n).transformCache[t]
                                }
                            }
                        }();
                        for (var e = 0; e < w.Lists.colors.length; e++) ! function() {
                            var t = w.Lists.colors[e];
                            w.Normalizations.registered[t] = function(e, n, r) {
                                switch (e) {
                                    case "name":
                                        return t;
                                    case "extract":
                                        var o;
                                        if (w.RegEx.wrappedValueAlreadyExtracted.test(r)) o = r;
                                        else {
                                            var a, s = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };
                                            /^[A-z]+$/i.test(r) ? a = s[r] !== i ? s[r] : s.black : w.RegEx.isHex.test(r) ? a = "rgb(" + w.Values.hexToRgb(r).join(" ") + ")" : /^rgba?\(/i.test(r) || (a = s.black), o = (a || r).toString().match(w.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                        }
                                        return 8 >= p || 3 !== o.split(" ").length || (o += " 1"), o;
                                    case "inject":
                                        return 8 >= p ? 4 === r.split(" ").length && (r = r.split(/\s+/).slice(0, 3).join(" ")) : 3 === r.split(" ").length && (r += " 1"), (8 >= p ? "rgb" : "rgba") + "(" + r.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                    }
                },
                Names: {
                    camelCase: function(e) {
                        return e.replace(/-(\w)/g, function(e, t) {
                            return t.toUpperCase()
                        })
                    },
                    SVGAttribute: function(e) {
                        var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        return (p || b.State.isAndroid && !b.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                    },
                    prefixCheck: function(e) {
                        if (b.State.prefixMatches[e]) return [b.State.prefixMatches[e], !0];
                        for (var t = ["", "Webkit", "Moz", "ms", "O"], n = 0, i = t.length; i > n; n++) {
                            var r;
                            if (r = 0 === n ? e : t[n] + e.replace(/^\w/, function(e) {
                                    return e.toUpperCase()
                                }), v.isString(b.State.prefixElement.style[r])) return b.State.prefixMatches[e] = r, [r, !0]
                        }
                        return [e, !1]
                    }
                },
                Values: {
                    hexToRgb: function(e) {
                        var t, n = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                            i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                        return e = e.replace(n, function(e, t, n, i) {
                            return t + t + n + n + i + i
                        }), t = i.exec(e), t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                    },
                    isCSSNullValue: function(e) {
                        return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                    },
                    getUnitType: function(e) {
                        return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                    },
                    getDisplayType: function(e) {
                        var t = e && e.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                    },
                    addClass: function(e, t) {
                        e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
                    },
                    removeClass: function(e, t) {
                        e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                    }
                },
                getPropertyValue: function(e, n, r, o) {
                    function s(e, n) {
                        function r() {
                            u && w.setPropertyValue(e, "display", "none")
                        }
                        var l = 0;
                        if (8 >= p) l = f.css(e, n);
                        else {
                            var u = !1;
                            if (/^(width|height)$/.test(n) && 0 === w.getPropertyValue(e, "display") && (u = !0, w.setPropertyValue(e, "display", w.Values.getDisplayType(e))), !o) {
                                if ("height" === n && "border-box" !== w.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var c = e.offsetHeight - (parseFloat(w.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingBottom")) || 0);
                                    return r(), c
                                }
                                if ("width" === n && "border-box" !== w.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var d = e.offsetWidth - (parseFloat(w.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingRight")) || 0);
                                    return r(), d
                                }
                            }
                            var h;
                            h = a(e) === i ? t.getComputedStyle(e, null) : a(e).computedStyle ? a(e).computedStyle : a(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === n && (n = "borderTopColor"), l = 9 === p && "filter" === n ? h.getPropertyValue(n) : h[n], ("" === l || null === l) && (l = e.style[n]), r()
                        }
                        if ("auto" === l && /^(top|right|bottom|left)$/i.test(n)) {
                            var v = s(e, "position");
                            ("fixed" === v || "absolute" === v && /top|left/i.test(n)) && (l = f(e).position()[n] + "px")
                        }
                        return l
                    }
                    var l;
                    if (w.Hooks.registered[n]) {
                        var u = n,
                            c = w.Hooks.getRoot(u);
                        r === i && (r = w.getPropertyValue(e, w.Names.prefixCheck(c)[0])), w.Normalizations.registered[c] && (r = w.Normalizations.registered[c]("extract", e, r)), l = w.Hooks.extractValue(u, r)
                    } else if (w.Normalizations.registered[n]) {
                        var d, h;
                        d = w.Normalizations.registered[n]("name", e), "transform" !== d && (h = s(e, w.Names.prefixCheck(d)[0]), w.Values.isCSSNullValue(h) && w.Hooks.templates[n] && (h = w.Hooks.templates[n][1])), l = w.Normalizations.registered[n]("extract", e, h)
                    }
                    if (!/^[\d-]/.test(l))
                        if (a(e) && a(e).isSVG && w.Names.SVGAttribute(n))
                            if (/^(height|width)$/i.test(n)) try {
                                l = e.getBBox()[n]
                            } catch (e) {
                                l = 0
                            } else l = e.getAttribute(n);
                            else l = s(e, w.Names.prefixCheck(n)[0]);
                    return w.Values.isCSSNullValue(l) && (l = 0), b.debug >= 2 && console.log("Get " + n + ": " + l), l
                },
                setPropertyValue: function(e, n, i, r, o) {
                    var s = n;
                    if ("scroll" === n) o.container ? o.container["scroll" + o.direction] = i : "Left" === o.direction ? t.scrollTo(i, o.alternateValue) : t.scrollTo(o.alternateValue, i);
                    else if (w.Normalizations.registered[n] && "transform" === w.Normalizations.registered[n]("name", e)) w.Normalizations.registered[n]("inject", e, i), s = "transform", i = a(e).transformCache[n];
                    else {
                        if (w.Hooks.registered[n]) {
                            var l = n,
                                u = w.Hooks.getRoot(n);
                            r = r || w.getPropertyValue(e, u), i = w.Hooks.injectValue(l, i, r), n = u
                        }
                        if (w.Normalizations.registered[n] && (i = w.Normalizations.registered[n]("inject", e, i), n = w.Normalizations.registered[n]("name", e)), s = w.Names.prefixCheck(n)[0], 8 >= p) try {
                            e.style[s] = i
                        } catch (e) {
                            b.debug && console.log("Browser does not support [" + i + "] for [" + s + "]")
                        } else a(e) && a(e).isSVG && w.Names.SVGAttribute(n) ? e.setAttribute(n, i) : e.style[s] = i;
                        b.debug >= 2 && console.log("Set " + n + " (" + s + "): " + i)
                    }
                    return [s, i]
                },
                flushTransformCache: function(e) {
                    function t(t) {
                        return parseFloat(w.getPropertyValue(e, t))
                    }
                    var n = "";
                    if ((p || b.State.isAndroid && !b.State.isChrome) && a(e).isSVG) {
                        var i = {
                            translate: [t("translateX"), t("translateY")],
                            skewX: [t("skewX")],
                            skewY: [t("skewY")],
                            scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                            rotate: [t("rotateZ"), 0, 0]
                        };
                        f.each(a(e).transformCache, function(e) {
                            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), i[e] && (n += e + "(" + i[e].join(" ") + ") ", delete i[e])
                        })
                    } else {
                        var r, o;
                        f.each(a(e).transformCache, function(t) {
                            return r = a(e).transformCache[t], "transformPerspective" === t ? (o = r, !0) : (9 === p && "rotateZ" === t && (t = "rotate"), void(n += t + r + " "))
                        }), o && (n = "perspective" + o + " " + n)
                    }
                    w.setPropertyValue(e, "transform", n)
                }
            };
            w.Hooks.register(), w.Normalizations.register(), b.hook = function(e, t, n) {
                var r = i;
                return e = o(e), f.each(e, function(e, o) {
                    if (a(o) === i && b.init(o), n === i) r === i && (r = b.CSS.getPropertyValue(o, t));
                    else {
                        var s = b.CSS.setPropertyValue(o, t, n);
                        "transform" === s[0] && b.CSS.flushTransformCache(o), r = s
                    }
                }), r
            };
            var C = function() {
                function e() {
                    return s ? P.promise || null : l
                }

                function r() {
                    function e(e) {
                        function d(e, t) {
                            var n = i,
                                r = i,
                                a = i;
                            return v.isArray(e) ? (n = e[0], !v.isArray(e[1]) && /^[\d-]/.test(e[1]) || v.isFunction(e[1]) || w.RegEx.isHex.test(e[1]) ? a = e[1] : (v.isString(e[1]) && !w.RegEx.isHex.test(e[1]) || v.isArray(e[1])) && (r = t ? e[1] : u(e[1], s.duration), e[2] !== i && (a = e[2]))) : n = e, t || (r = r || s.easing), v.isFunction(n) && (n = n.call(o, k, T)), v.isFunction(a) && (a = a.call(o, k, T)), [n || 0, r, a]
                        }

                        function p(e, t) {
                            var n, i;
                            return i = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                                return n = e, ""
                            }), n || (n = w.Values.getUnitType(e)), [i, n]
                        }

                        function m() {
                            var e = {
                                    myParent: o.parentNode || n.body,
                                    position: w.getPropertyValue(o, "position"),
                                    fontSize: w.getPropertyValue(o, "fontSize")
                                },
                                i = e.position === I.lastPosition && e.myParent === I.lastParent,
                                r = e.fontSize === I.lastFontSize;
                            I.lastParent = e.myParent, I.lastPosition = e.position, I.lastFontSize = e.fontSize;
                            var s = 100,
                                l = {};
                            if (r && i) l.emToPx = I.lastEmToPx, l.percentToPxWidth = I.lastPercentToPxWidth, l.percentToPxHeight = I.lastPercentToPxHeight;
                            else {
                                var u = a(o).isSVG ? n.createElementNS("http://www.w3.org/2000/svg", "rect") : n.createElement("div");
                                b.init(u), e.myParent.appendChild(u), f.each(["overflow", "overflowX", "overflowY"], function(e, t) {
                                    b.CSS.setPropertyValue(u, t, "hidden")
                                }), b.CSS.setPropertyValue(u, "position", e.position), b.CSS.setPropertyValue(u, "fontSize", e.fontSize), b.CSS.setPropertyValue(u, "boxSizing", "content-box"), f.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) {
                                    b.CSS.setPropertyValue(u, t, s + "%")
                                }), b.CSS.setPropertyValue(u, "paddingLeft", s + "em"), l.percentToPxWidth = I.lastPercentToPxWidth = (parseFloat(w.getPropertyValue(u, "width", null, !0)) || 1) / s, l.percentToPxHeight = I.lastPercentToPxHeight = (parseFloat(w.getPropertyValue(u, "height", null, !0)) || 1) / s, l.emToPx = I.lastEmToPx = (parseFloat(w.getPropertyValue(u, "paddingLeft")) || 1) / s, e.myParent.removeChild(u)
                            }
                            return null === I.remToPx && (I.remToPx = parseFloat(w.getPropertyValue(n.body, "fontSize")) || 16), null === I.vwToPx && (I.vwToPx = parseFloat(t.innerWidth) / 100, I.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = I.remToPx, l.vwToPx = I.vwToPx, l.vhToPx = I.vhToPx, b.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), o), l
                        }
                        if (s.begin && 0 === k) try {
                            s.begin.call(h, h)
                        } catch (e) {
                            setTimeout(function() {
                                throw e
                            }, 1)
                        }
                        if ("scroll" === A) {
                            var x, C, S, E = /^x$/i.test(s.axis) ? "Left" : "Top",
                                O = parseFloat(s.offset) || 0;
                            s.container ? v.isWrapped(s.container) || v.isNode(s.container) ? (s.container = s.container[0] || s.container, x = s.container["scroll" + E], S = x + f(o).position()[E.toLowerCase()] + O) : s.container = null : (x = b.State.scrollAnchor[b.State["scrollProperty" + E]], C = b.State.scrollAnchor[b.State["scrollProperty" + ("Left" === E ? "Top" : "Left")]], S = f(o).offset()[E.toLowerCase()] + O), l = {
                                scroll: {
                                    rootPropertyValue: !1,
                                    startValue: x,
                                    currentValue: x,
                                    endValue: S,
                                    unitType: "",
                                    easing: s.easing,
                                    scrollData: {
                                        container: s.container,
                                        direction: E,
                                        alternateValue: C
                                    }
                                },
                                element: o
                            }, b.debug && console.log("tweensContainer (scroll): ", l.scroll, o)
                        } else if ("reverse" === A) {
                            if (!a(o).tweensContainer) return void f.dequeue(o, s.queue);
                            "none" === a(o).opts.display && (a(o).opts.display = "auto"), "hidden" === a(o).opts.visibility && (a(o).opts.visibility = "visible"), a(o).opts.loop = !1, a(o).opts.begin = null, a(o).opts.complete = null, y.easing || delete s.easing, y.duration || delete s.duration, s = f.extend({}, a(o).opts, s);
                            var D = f.extend(!0, {}, a(o).tweensContainer);
                            for (var q in D)
                                if ("element" !== q) {
                                    var j = D[q].startValue;
                                    D[q].startValue = D[q].currentValue = D[q].endValue, D[q].endValue = j, v.isEmptyObject(y) || (D[q].easing = s.easing), b.debug && console.log("reverse tweensContainer (" + q + "): " + JSON.stringify(D[q]), o)
                                }
                            l = D
                        } else if ("start" === A) {
                            var D;
                            a(o).tweensContainer && a(o).isAnimating === !0 && (D = a(o).tweensContainer), f.each(g, function(e, t) {
                                if (RegExp("^" + w.Lists.colors.join("$|^") + "$").test(e)) {
                                    var n = d(t, !0),
                                        r = n[0],
                                        o = n[1],
                                        a = n[2];
                                    if (w.RegEx.isHex.test(r)) {
                                        for (var s = ["Red", "Green", "Blue"], l = w.Values.hexToRgb(r), u = a ? w.Values.hexToRgb(a) : i, c = 0; c < s.length; c++) {
                                            var f = [l[c]];
                                            o && f.push(o), u !== i && f.push(u[c]), g[e + s[c]] = f
                                        }
                                        delete g[e]
                                    }
                                }
                            });
                            for (var N in g) {
                                var M = d(g[N]),
                                    H = M[0],
                                    _ = M[1],
                                    F = M[2];
                                N = w.Names.camelCase(N);
                                var $ = w.Hooks.getRoot(N),
                                    R = !1;
                                if (a(o).isSVG || "tween" === $ || w.Names.prefixCheck($)[1] !== !1 || w.Normalizations.registered[$] !== i) {
                                    (s.display !== i && null !== s.display && "none" !== s.display || s.visibility !== i && "hidden" !== s.visibility) && /opacity|filter/.test(N) && !F && 0 !== H && (F = 0), s._cacheValues && D && D[N] ? (F === i && (F = D[N].endValue + D[N].unitType), R = a(o).rootPropertyValueCache[$]) : w.Hooks.registered[N] ? F === i ? (R = w.getPropertyValue(o, $), F = w.getPropertyValue(o, N, R)) : R = w.Hooks.templates[$][1] : F === i && (F = w.getPropertyValue(o, N));
                                    var z, W, V, Q = !1;
                                    if (z = p(N, F), F = z[0], V = z[1], z = p(N, H), H = z[0].replace(/^([+-\/*])=/, function(e, t) {
                                            return Q = t, ""
                                        }), W = z[1], F = parseFloat(F) || 0, H = parseFloat(H) || 0, "%" === W && (/^(fontSize|lineHeight)$/.test(N) ? (H /= 100, W = "em") : /^scale/.test(N) ? (H /= 100, W = "") : /(Red|Green|Blue)$/i.test(N) && (H = H / 100 * 255, W = "")), /[\/*]/.test(Q)) W = V;
                                    else if (V !== W && 0 !== F)
                                        if (0 === H) W = V;
                                        else {
                                            r = r || m();
                                            var X = /margin|padding|left|right|width|text|word|letter/i.test(N) || /X$/.test(N) || "x" === N ? "x" : "y";
                                            switch (V) {
                                                case "%":
                                                    F *= "x" === X ? r.percentToPxWidth : r.percentToPxHeight;
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    F *= r[V + "ToPx"]
                                            }
                                            switch (W) {
                                                case "%":
                                                    F *= 1 / ("x" === X ? r.percentToPxWidth : r.percentToPxHeight);
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    F *= 1 / r[W + "ToPx"]
                                            }
                                        }
                                    switch (Q) {
                                        case "+":
                                            H = F + H;
                                            break;
                                        case "-":
                                            H = F - H;
                                            break;
                                        case "*":
                                            H = F * H;
                                            break;
                                        case "/":
                                            H = F / H
                                    }
                                    l[N] = {
                                        rootPropertyValue: R,
                                        startValue: F,
                                        currentValue: F,
                                        endValue: H,
                                        unitType: W,
                                        easing: _
                                    }, b.debug && console.log("tweensContainer (" + N + "): " + JSON.stringify(l[N]), o)
                                } else b.debug && console.log("Skipping [" + $ + "] due to a lack of browser support.")
                            }
                            l.element = o
                        }
                        l.element && (w.Values.addClass(o, "velocity-animating"), L.push(l), "" === s.queue && (a(o).tweensContainer = l, a(o).opts = s), a(o).isAnimating = !0, k === T - 1 ? (b.State.calls.push([L, h, s, null, P.resolver]), b.State.isTicking === !1 && (b.State.isTicking = !0, c())) : k++)
                    }
                    var r, o = this,
                        s = f.extend({}, b.defaults, y),
                        l = {};
                    switch (a(o) === i && b.init(o), parseFloat(s.delay) && s.queue !== !1 && f.queue(o, s.queue, function(e) {
                        b.velocityQueueEntryFlag = !0, a(o).delayTimer = {
                            setTimeout: setTimeout(e, parseFloat(s.delay)),
                            next: e
                        }
                    }), s.duration.toString().toLowerCase()) {
                        case "fast":
                            s.duration = 200;
                            break;
                        case "normal":
                            s.duration = m;
                            break;
                        case "slow":
                            s.duration = 600;
                            break;
                        default:
                            s.duration = parseFloat(s.duration) || 1
                    }
                    b.mock !== !1 && (b.mock === !0 ? s.duration = s.delay = 1 : (s.duration *= parseFloat(b.mock) || 1, s.delay *= parseFloat(b.mock) || 1)), s.easing = u(s.easing, s.duration), s.begin && !v.isFunction(s.begin) && (s.begin = null), s.progress && !v.isFunction(s.progress) && (s.progress = null), s.complete && !v.isFunction(s.complete) && (s.complete = null), s.display !== i && null !== s.display && (s.display = s.display.toString().toLowerCase(), "auto" === s.display && (s.display = b.CSS.Values.getDisplayType(o))), s.visibility !== i && null !== s.visibility && (s.visibility = s.visibility.toString().toLowerCase()), s.mobileHA = s.mobileHA && b.State.isMobile && !b.State.isGingerbread, s.queue === !1 ? s.delay ? setTimeout(e, s.delay) : e() : f.queue(o, s.queue, function(t, n) {
                        return n === !0 ? (P.promise && P.resolver(h), !0) : (b.velocityQueueEntryFlag = !0, void e(t))
                    }), "" !== s.queue && "fx" !== s.queue || "inprogress" === f.queue(o)[0] || f.dequeue(o)
                }
                var s, l, p, h, g, y, x = arguments[0] && (arguments[0].p || f.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || v.isString(arguments[0].properties));
                if (v.isWrapped(this) ? (s = !1, p = 0, h = this, l = this) : (s = !0, p = 1, h = x ? arguments[0].elements || arguments[0].e : arguments[0]), h = o(h)) {
                    x ? (g = arguments[0].properties || arguments[0].p, y = arguments[0].options || arguments[0].o) : (g = arguments[p], y = arguments[p + 1]);
                    var T = h.length,
                        k = 0;
                    if (!/^(stop|finish)$/i.test(g) && !f.isPlainObject(y)) {
                        var S = p + 1;
                        y = {};
                        for (var E = S; E < arguments.length; E++) v.isArray(arguments[E]) || !/^(fast|normal|slow)$/i.test(arguments[E]) && !/^\d/.test(arguments[E]) ? v.isString(arguments[E]) || v.isArray(arguments[E]) ? y.easing = arguments[E] : v.isFunction(arguments[E]) && (y.complete = arguments[E]) : y.duration = arguments[E]
                    }
                    var P = {
                        promise: null,
                        resolver: null,
                        rejecter: null
                    };
                    s && b.Promise && (P.promise = new b.Promise(function(e, t) {
                        P.resolver = e, P.rejecter = t
                    }));
                    var A;
                    switch (g) {
                        case "scroll":
                            A = "scroll";
                            break;
                        case "reverse":
                            A = "reverse";
                            break;
                        case "finish":
                        case "stop":
                            f.each(h, function(e, t) {
                                a(t) && a(t).delayTimer && (clearTimeout(a(t).delayTimer.setTimeout), a(t).delayTimer.next && a(t).delayTimer.next(), delete a(t).delayTimer)
                            });
                            var O = [];
                            return f.each(b.State.calls, function(e, t) {
                                t && f.each(t[1], function(n, r) {
                                    var o = y === i ? "" : y;
                                    return o !== !0 && t[2].queue !== o && (y !== i || t[2].queue !== !1) || void f.each(h, function(n, i) {
                                        i === r && ((y === !0 || v.isString(y)) && (f.each(f.queue(i, v.isString(y) ? y : ""), function(e, t) {
                                            v.isFunction(t) && t(null, !0)
                                        }), f.queue(i, v.isString(y) ? y : "", [])), "stop" === g ? (a(i) && a(i).tweensContainer && o !== !1 && f.each(a(i).tweensContainer, function(e, t) {
                                            t.endValue = t.currentValue
                                        }), O.push(e)) : "finish" === g && (t[2].duration = 1))
                                    })
                                })
                            }), "stop" === g && (f.each(O, function(e, t) {
                                d(t, !0)
                            }), P.promise && P.resolver(h)), e();
                        default:
                            if (!f.isPlainObject(g) || v.isEmptyObject(g)) {
                                if (v.isString(g) && b.Redirects[g]) {
                                    var D = f.extend({}, y),
                                        q = D.duration,
                                        j = D.delay || 0;
                                    return D.backwards === !0 && (h = f.extend(!0, [], h).reverse()), f.each(h, function(e, t) {
                                        parseFloat(D.stagger) ? D.delay = j + parseFloat(D.stagger) * e : v.isFunction(D.stagger) && (D.delay = j + D.stagger.call(t, e, T)), D.drag && (D.duration = parseFloat(q) || (/^(callout|transition)/.test(g) ? 1e3 : m), D.duration = Math.max(D.duration * (D.backwards ? 1 - e / T : (e + 1) / T), .75 * D.duration, 200)), b.Redirects[g].call(t, t, D || {}, e, T, h, P.promise ? P : i)
                                    }), e()
                                }
                                var N = "Velocity: First argument (" + g + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return P.promise ? P.rejecter(new Error(N)) : console.log(N), e()
                            }
                            A = "start"
                    }
                    var I = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        },
                        L = [];
                    f.each(h, function(e, t) {
                        v.isNode(t) && r.call(t)
                    });
                    var M, D = f.extend({}, b.defaults, y);
                    if (D.loop = parseInt(D.loop), M = 2 * D.loop - 1, D.loop)
                        for (var H = 0; M > H; H++) {
                            var _ = {
                                delay: D.delay,
                                progress: D.progress
                            };
                            H === M - 1 && (_.display = D.display, _.visibility = D.visibility, _.complete = D.complete), C(h, "reverse", _)
                        }
                    return e()
                }
            };
            b = f.extend(C, b), b.animate = C;
            var T = t.requestAnimationFrame || h;
            return b.State.isMobile || n.hidden === i || n.addEventListener("visibilitychange", function() {
                n.hidden ? (T = function(e) {
                    return setTimeout(function() {
                        e(!0)
                    }, 16)
                }, c()) : T = t.requestAnimationFrame || h
            }), e.Velocity = b, e !== t && (e.fn.velocity = C, e.fn.velocity.defaults = b.defaults), f.each(["Down", "Up"], function(e, t) {
                b.Redirects["slide" + t] = function(e, n, r, o, a, s) {
                    var l = f.extend({}, n),
                        u = l.begin,
                        c = l.complete,
                        d = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        },
                        p = {};
                    l.display === i && (l.display = "Down" === t ? "inline" === b.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function() {
                        u && u.call(a, a);
                        for (var n in d) {
                            p[n] = e.style[n];
                            var i = b.CSS.getPropertyValue(e, n);
                            d[n] = "Down" === t ? [i, 0] : [0, i]
                        }
                        p.overflow = e.style.overflow, e.style.overflow = "hidden"
                    }, l.complete = function() {
                        for (var t in p) e.style[t] = p[t];
                        c && c.call(a, a), s && s.resolver(a)
                    }, b(e, d, l)
                }
            }), f.each(["In", "Out"], function(e, t) {
                b.Redirects["fade" + t] = function(e, n, r, o, a, s) {
                    var l = f.extend({}, n),
                        u = {
                            opacity: "In" === t ? 1 : 0
                        },
                        c = l.complete;
                    l.complete = r !== o - 1 ? l.begin = null : function() {
                        c && c.call(a, a), s && s.resolver(a)
                    }, l.display === i && (l.display = "In" === t ? "auto" : "none"), b(this, u, l)
                }
            }), b
        }(window.jQuery || window.Zepto || window, window, document)
    })), ! function(e, t, n, i) {
        "use strict";

        function r(e, t, n) {
            return setTimeout(c(e, n), t)
        }

        function o(e, t, n) {
            return !!Array.isArray(e) && (a(e, n[t], n), !0)
        }

        function a(e, t, n) {
            var r;
            if (e)
                if (e.forEach) e.forEach(t, n);
                else if (e.length !== i)
                for (r = 0; r < e.length;) t.call(n, e[r], r, e), r++;
            else
                for (r in e) e.hasOwnProperty(r) && t.call(n, e[r], r, e)
        }

        function s(e, t, n) {
            for (var r = Object.keys(t), o = 0; o < r.length;)(!n || n && e[r[o]] === i) && (e[r[o]] = t[r[o]]), o++;
            return e
        }

        function l(e, t) {
            return s(e, t, !0);
        }

        function u(e, t, n) {
            var i, r = t.prototype;
            i = e.prototype = Object.create(r), i.constructor = e, i._super = r, n && s(i, n)
        }

        function c(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        }

        function d(e, t) {
            return typeof e == ce ? e.apply(t ? t[0] || i : i, t) : e
        }

        function f(e, t) {
            return e === i ? t : e
        }

        function p(e, t, n) {
            a(m(t), function(t) {
                e.addEventListener(t, n, !1)
            })
        }

        function h(e, t, n) {
            a(m(t), function(t) {
                e.removeEventListener(t, n, !1)
            })
        }

        function v(e, t) {
            for (; e;) {
                if (e == t) return !0;
                e = e.parentNode
            }
            return !1
        }

        function g(e, t) {
            return e.indexOf(t) > -1
        }

        function m(e) {
            return e.trim().split(/\s+/g)
        }

        function y(e, t, n) {
            if (e.indexOf && !n) return e.indexOf(t);
            for (var i = 0; i < e.length;) {
                if (n && e[i][n] == t || !n && e[i] === t) return i;
                i++
            }
            return -1
        }

        function b(e) {
            return Array.prototype.slice.call(e, 0)
        }

        function x(e, t, n) {
            for (var i = [], r = [], o = 0; o < e.length;) {
                var a = t ? e[o][t] : e[o];
                y(r, a) < 0 && i.push(e[o]), r[o] = a, o++
            }
            return n && (i = t ? i.sort(function(e, n) {
                return e[t] > n[t]
            }) : i.sort()), i
        }

        function w(e, t) {
            for (var n, r, o = t[0].toUpperCase() + t.slice(1), a = 0; a < le.length;) {
                if (n = le[a], r = n ? n + o : t, r in e) return r;
                a++
            }
            return i
        }

        function C() {
            return he++
        }

        function T(e) {
            var t = e.ownerDocument;
            return t.defaultView || t.parentWindow
        }

        function k(e, t) {
            var n = this;
            this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function(t) {
                d(e.options.enable, [e]) && n.handler(t)
            }, this.init()
        }

        function S(e) {
            var t, n = e.options.inputClass;
            return new(t = n ? n : me ? F : ye ? z : ge ? V : _)(e, E)
        }

        function E(e, t, n) {
            var i = n.pointers.length,
                r = n.changedPointers.length,
                o = t & ke && 0 === i - r,
                a = t & (Ee | Pe) && 0 === i - r;
            n.isFirst = !!o, n.isFinal = !!a, o && (e.session = {}), n.eventType = t, P(e, n), e.emit("hammer.input", n), e.recognize(n), e.session.prevInput = n
        }

        function P(e, t) {
            var n = e.session,
                i = t.pointers,
                r = i.length;
            n.firstInput || (n.firstInput = D(t)), r > 1 && !n.firstMultiple ? n.firstMultiple = D(t) : 1 === r && (n.firstMultiple = !1);
            var o = n.firstInput,
                a = n.firstMultiple,
                s = a ? a.center : o.center,
                l = t.center = q(i);
            t.timeStamp = pe(), t.deltaTime = t.timeStamp - o.timeStamp, t.angle = L(s, l), t.distance = I(s, l), A(n, t), t.offsetDirection = N(t.deltaX, t.deltaY), t.scale = a ? H(a.pointers, i) : 1, t.rotation = a ? M(a.pointers, i) : 0, O(n, t);
            var u = e.element;
            v(t.srcEvent.target, u) && (u = t.srcEvent.target), t.target = u
        }

        function A(e, t) {
            var n = t.center,
                i = e.offsetDelta || {},
                r = e.prevDelta || {},
                o = e.prevInput || {};
            (t.eventType === ke || o.eventType === Ee) && (r = e.prevDelta = {
                x: o.deltaX || 0,
                y: o.deltaY || 0
            }, i = e.offsetDelta = {
                x: n.x,
                y: n.y
            }), t.deltaX = r.x + (n.x - i.x), t.deltaY = r.y + (n.y - i.y)
        }

        function O(e, t) {
            var n, r, o, a, s = e.lastInterval || t,
                l = t.timeStamp - s.timeStamp;
            if (t.eventType != Pe && (l > Te || s.velocity === i)) {
                var u = s.deltaX - t.deltaX,
                    c = s.deltaY - t.deltaY,
                    d = j(l, u, c);
                r = d.x, o = d.y, n = fe(d.x) > fe(d.y) ? d.x : d.y, a = N(u, c), e.lastInterval = t
            } else n = s.velocity, r = s.velocityX, o = s.velocityY, a = s.direction;
            t.velocity = n, t.velocityX = r, t.velocityY = o, t.direction = a
        }

        function D(e) {
            for (var t = [], n = 0; n < e.pointers.length;) t[n] = {
                clientX: de(e.pointers[n].clientX),
                clientY: de(e.pointers[n].clientY)
            }, n++;
            return {
                timeStamp: pe(),
                pointers: t,
                center: q(t),
                deltaX: e.deltaX,
                deltaY: e.deltaY
            }
        }

        function q(e) {
            var t = e.length;
            if (1 === t) return {
                x: de(e[0].clientX),
                y: de(e[0].clientY)
            };
            for (var n = 0, i = 0, r = 0; t > r;) n += e[r].clientX, i += e[r].clientY, r++;
            return {
                x: de(n / t),
                y: de(i / t)
            }
        }

        function j(e, t, n) {
            return {
                x: t / e || 0,
                y: n / e || 0
            }
        }

        function N(e, t) {
            return e === t ? Ae : fe(e) >= fe(t) ? e > 0 ? Oe : De : t > 0 ? qe : je
        }

        function I(e, t, n) {
            n || (n = Me);
            var i = t[n[0]] - e[n[0]],
                r = t[n[1]] - e[n[1]];
            return Math.sqrt(i * i + r * r)
        }

        function L(e, t, n) {
            n || (n = Me);
            var i = t[n[0]] - e[n[0]],
                r = t[n[1]] - e[n[1]];
            return 180 * Math.atan2(r, i) / Math.PI
        }

        function M(e, t) {
            return L(t[1], t[0], He) - L(e[1], e[0], He)
        }

        function H(e, t) {
            return I(t[0], t[1], He) / I(e[0], e[1], He)
        }

        function _() {
            this.evEl = Fe, this.evWin = $e, this.allow = !0, this.pressed = !1, k.apply(this, arguments)
        }

        function F() {
            this.evEl = We, this.evWin = Ve, k.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
        }

        function $() {
            this.evTarget = Xe, this.evWin = Be, this.started = !1, k.apply(this, arguments)
        }

        function R(e, t) {
            var n = b(e.touches),
                i = b(e.changedTouches);
            return t & (Ee | Pe) && (n = x(n.concat(i), "identifier", !0)), [n, i]
        }

        function z() {
            this.evTarget = Ue, this.targetIds = {}, k.apply(this, arguments)
        }

        function W(e, t) {
            var n = b(e.touches),
                i = this.targetIds;
            if (t & (ke | Se) && 1 === n.length) return i[n[0].identifier] = !0, [n, n];
            var r, o, a = b(e.changedTouches),
                s = [],
                l = this.target;
            if (o = n.filter(function(e) {
                    return v(e.target, l)
                }), t === ke)
                for (r = 0; r < o.length;) i[o[r].identifier] = !0, r++;
            for (r = 0; r < a.length;) i[a[r].identifier] && s.push(a[r]), t & (Ee | Pe) && delete i[a[r].identifier], r++;
            return s.length ? [x(o.concat(s), "identifier", !0), s] : void 0
        }

        function V() {
            k.apply(this, arguments);
            var e = c(this.handler, this);
            this.touch = new z(this.manager, e), this.mouse = new _(this.manager, e)
        }

        function Q(e, t) {
            this.manager = e, this.set(t)
        }

        function X(e) {
            if (g(e, tt)) return tt;
            var t = g(e, nt),
                n = g(e, it);
            return t && n ? nt + " " + it : t || n ? t ? nt : it : g(e, et) ? et : Ke
        }

        function B(e) {
            this.id = C(), this.manager = null, this.options = l(e || {}, this.defaults), this.options.enable = f(this.options.enable, !0), this.state = rt, this.simultaneous = {}, this.requireFail = []
        }

        function Y(e) {
            return e & ut ? "cancel" : e & st ? "end" : e & at ? "move" : e & ot ? "start" : ""
        }

        function U(e) {
            return e == je ? "down" : e == qe ? "up" : e == Oe ? "left" : e == De ? "right" : ""
        }

        function G(e, t) {
            var n = t.manager;
            return n ? n.get(e) : e
        }

        function J() {
            B.apply(this, arguments)
        }

        function Z() {
            J.apply(this, arguments), this.pX = null, this.pY = null
        }

        function K() {
            J.apply(this, arguments)
        }

        function ee() {
            B.apply(this, arguments), this._timer = null, this._input = null
        }

        function te() {
            J.apply(this, arguments)
        }

        function ne() {
            J.apply(this, arguments)
        }

        function ie() {
            B.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
        }

        function re(e, t) {
            return t = t || {}, t.recognizers = f(t.recognizers, re.defaults.preset), new oe(e, t)
        }

        function oe(e, t) {
            t = t || {}, this.options = l(t, re.defaults), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = e, this.input = S(this), this.touchAction = new Q(this, this.options.touchAction), ae(this, !0), a(t.recognizers, function(e) {
                var t = this.add(new e[0](e[1]));
                e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3])
            }, this)
        }

        function ae(e, t) {
            var n = e.element;
            a(e.options.cssProps, function(e, i) {
                n.style[w(n.style, i)] = t ? e : ""
            })
        }

        function se(e, n) {
            var i = t.createEvent("Event");
            i.initEvent(e, !0, !0), i.gesture = n, n.target.dispatchEvent(i)
        }
        var le = ["", "webkit", "moz", "MS", "ms", "o"],
            ue = t.createElement("div"),
            ce = "function",
            de = Math.round,
            fe = Math.abs,
            pe = Date.now,
            he = 1,
            ve = /mobile|tablet|ip(ad|hone|od)|android/i,
            ge = "ontouchstart" in e,
            me = w(e, "PointerEvent") !== i,
            ye = ge && ve.test(navigator.userAgent),
            be = "touch",
            xe = "pen",
            we = "mouse",
            Ce = "kinect",
            Te = 25,
            ke = 1,
            Se = 2,
            Ee = 4,
            Pe = 8,
            Ae = 1,
            Oe = 2,
            De = 4,
            qe = 8,
            je = 16,
            Ne = Oe | De,
            Ie = qe | je,
            Le = Ne | Ie,
            Me = ["x", "y"],
            He = ["clientX", "clientY"];
        k.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(T(this.element), this.evWin, this.domHandler)
            },
            destroy: function() {
                this.evEl && h(this.element, this.evEl, this.domHandler), this.evTarget && h(this.target, this.evTarget, this.domHandler), this.evWin && h(T(this.element), this.evWin, this.domHandler)
            }
        };
        var _e = {
                mousedown: ke,
                mousemove: Se,
                mouseup: Ee
            },
            Fe = "mousedown",
            $e = "mousemove mouseup";
        u(_, k, {
            handler: function(e) {
                var t = _e[e.type];
                t & ke && 0 === e.button && (this.pressed = !0), t & Se && 1 !== e.which && (t = Ee), this.pressed && this.allow && (t & Ee && (this.pressed = !1), this.callback(this.manager, t, {
                    pointers: [e],
                    changedPointers: [e],
                    pointerType: we,
                    srcEvent: e
                }))
            }
        });
        var Re = {
                pointerdown: ke,
                pointermove: Se,
                pointerup: Ee,
                pointercancel: Pe,
                pointerout: Pe
            },
            ze = {
                2: be,
                3: xe,
                4: we,
                5: Ce
            },
            We = "pointerdown",
            Ve = "pointermove pointerup pointercancel";
        e.MSPointerEvent && (We = "MSPointerDown", Ve = "MSPointerMove MSPointerUp MSPointerCancel"), u(F, k, {
            handler: function(e) {
                var t = this.store,
                    n = !1,
                    i = e.type.toLowerCase().replace("ms", ""),
                    r = Re[i],
                    o = ze[e.pointerType] || e.pointerType,
                    a = o == be,
                    s = y(t, e.pointerId, "pointerId");
                r & ke && (0 === e.button || a) ? 0 > s && (t.push(e), s = t.length - 1) : r & (Ee | Pe) && (n = !0), 0 > s || (t[s] = e, this.callback(this.manager, r, {
                    pointers: t,
                    changedPointers: [e],
                    pointerType: o,
                    srcEvent: e
                }), n && t.splice(s, 1))
            }
        });
        var Qe = {
                touchstart: ke,
                touchmove: Se,
                touchend: Ee,
                touchcancel: Pe
            },
            Xe = "touchstart",
            Be = "touchstart touchmove touchend touchcancel";
        u($, k, {
            handler: function(e) {
                var t = Qe[e.type];
                if (t === ke && (this.started = !0), this.started) {
                    var n = R.call(this, e, t);
                    t & (Ee | Pe) && 0 === n[0].length - n[1].length && (this.started = !1), this.callback(this.manager, t, {
                        pointers: n[0],
                        changedPointers: n[1],
                        pointerType: be,
                        srcEvent: e
                    })
                }
            }
        });
        var Ye = {
                touchstart: ke,
                touchmove: Se,
                touchend: Ee,
                touchcancel: Pe
            },
            Ue = "touchstart touchmove touchend touchcancel";
        u(z, k, {
            handler: function(e) {
                var t = Ye[e.type],
                    n = W.call(this, e, t);
                n && this.callback(this.manager, t, {
                    pointers: n[0],
                    changedPointers: n[1],
                    pointerType: be,
                    srcEvent: e
                })
            }
        }), u(V, k, {
            handler: function(e, t, n) {
                var i = n.pointerType == be,
                    r = n.pointerType == we;
                if (i) this.mouse.allow = !1;
                else if (r && !this.mouse.allow) return;
                t & (Ee | Pe) && (this.mouse.allow = !0), this.callback(e, t, n)
            },
            destroy: function() {
                this.touch.destroy(), this.mouse.destroy()
            }
        });
        var Ge = w(ue.style, "touchAction"),
            Je = Ge !== i,
            Ze = "compute",
            Ke = "auto",
            et = "manipulation",
            tt = "none",
            nt = "pan-x",
            it = "pan-y";
        Q.prototype = {
            set: function(e) {
                e == Ze && (e = this.compute()), Je && (this.manager.element.style[Ge] = e), this.actions = e.toLowerCase().trim()
            },
            update: function() {
                this.set(this.manager.options.touchAction)
            },
            compute: function() {
                var e = [];
                return a(this.manager.recognizers, function(t) {
                    d(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
                }), X(e.join(" "))
            },
            preventDefaults: function(e) {
                if (!Je) {
                    var t = e.srcEvent,
                        n = e.offsetDirection;
                    if (this.manager.session.prevented) return void t.preventDefault();
                    var i = this.actions,
                        r = g(i, tt),
                        o = g(i, it),
                        a = g(i, nt);
                    return r || o && n & Ne || a && n & Ie ? this.preventSrc(t) : void 0
                }
            },
            preventSrc: function(e) {
                this.manager.session.prevented = !0, e.preventDefault()
            }
        };
        var rt = 1,
            ot = 2,
            at = 4,
            st = 8,
            lt = st,
            ut = 16,
            ct = 32;
        B.prototype = {
            defaults: {},
            set: function(e) {
                return s(this.options, e), this.manager && this.manager.touchAction.update(), this
            },
            recognizeWith: function(e) {
                if (o(e, "recognizeWith", this)) return this;
                var t = this.simultaneous;
                return e = G(e, this), t[e.id] || (t[e.id] = e, e.recognizeWith(this)), this
            },
            dropRecognizeWith: function(e) {
                return o(e, "dropRecognizeWith", this) ? this : (e = G(e, this), delete this.simultaneous[e.id], this)
            },
            requireFailure: function(e) {
                if (o(e, "requireFailure", this)) return this;
                var t = this.requireFail;
                return e = G(e, this), -1 === y(t, e) && (t.push(e), e.requireFailure(this)), this
            },
            dropRequireFailure: function(e) {
                if (o(e, "dropRequireFailure", this)) return this;
                e = G(e, this);
                var t = y(this.requireFail, e);
                return t > -1 && this.requireFail.splice(t, 1), this
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function(e) {
                return !!this.simultaneous[e.id]
            },
            emit: function(e) {
                function t(t) {
                    n.manager.emit(n.options.event + (t ? Y(i) : ""), e)
                }
                var n = this,
                    i = this.state;
                st > i && t(!0), t(), i >= st && t(!0)
            },
            tryEmit: function(e) {
                return this.canEmit() ? this.emit(e) : void(this.state = ct)
            },
            canEmit: function() {
                for (var e = 0; e < this.requireFail.length;) {
                    if (!(this.requireFail[e].state & (ct | rt))) return !1;
                    e++
                }
                return !0
            },
            recognize: function(e) {
                var t = s({}, e);
                return d(this.options.enable, [this, t]) ? (this.state & (lt | ut | ct) && (this.state = rt), this.state = this.process(t), void(this.state & (ot | at | st | ut) && this.tryEmit(t))) : (this.reset(), void(this.state = ct))
            },
            process: function() {},
            getTouchAction: function() {},
            reset: function() {}
        }, u(J, B, {
            defaults: {
                pointers: 1
            },
            attrTest: function(e) {
                var t = this.options.pointers;
                return 0 === t || e.pointers.length === t
            },
            process: function(e) {
                var t = this.state,
                    n = e.eventType,
                    i = t & (ot | at),
                    r = this.attrTest(e);
                return i && (n & Pe || !r) ? t | ut : i || r ? n & Ee ? t | st : t & ot ? t | at : ot : ct
            }
        }), u(Z, J, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: Le
            },
            getTouchAction: function() {
                var e = this.options.direction,
                    t = [];
                return e & Ne && t.push(it), e & Ie && t.push(nt), t
            },
            directionTest: function(e) {
                var t = this.options,
                    n = !0,
                    i = e.distance,
                    r = e.direction,
                    o = e.deltaX,
                    a = e.deltaY;
                return r & t.direction || (t.direction & Ne ? (r = 0 === o ? Ae : 0 > o ? Oe : De, n = o != this.pX, i = Math.abs(e.deltaX)) : (r = 0 === a ? Ae : 0 > a ? qe : je, n = a != this.pY, i = Math.abs(e.deltaY))), e.direction = r, n && i > t.threshold && r & t.direction
            },
            attrTest: function(e) {
                return J.prototype.attrTest.call(this, e) && (this.state & ot || !(this.state & ot) && this.directionTest(e))
            },
            emit: function(e) {
                this.pX = e.deltaX, this.pY = e.deltaY;
                var t = U(e.direction);
                t && this.manager.emit(this.options.event + t, e), this._super.emit.call(this, e)
            }
        }), u(K, J, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [tt]
            },
            attrTest: function(e) {
                return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & ot)
            },
            emit: function(e) {
                if (this._super.emit.call(this, e), 1 !== e.scale) {
                    var t = e.scale < 1 ? "in" : "out";
                    this.manager.emit(this.options.event + t, e)
                }
            }
        }), u(ee, B, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 500,
                threshold: 5
            },
            getTouchAction: function() {
                return [Ke]
            },
            process: function(e) {
                var t = this.options,
                    n = e.pointers.length === t.pointers,
                    i = e.distance < t.threshold,
                    o = e.deltaTime > t.time;
                if (this._input = e, !i || !n || e.eventType & (Ee | Pe) && !o) this.reset();
                else if (e.eventType & ke) this.reset(), this._timer = r(function() {
                    this.state = lt, this.tryEmit()
                }, t.time, this);
                else if (e.eventType & Ee) return lt;
                return ct
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function(e) {
                this.state === lt && (e && e.eventType & Ee ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = pe(), this.manager.emit(this.options.event, this._input)))
            }
        }), u(te, J, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [tt]
            },
            attrTest: function(e) {
                return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & ot)
            }
        }), u(ne, J, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .65,
                direction: Ne | Ie,
                pointers: 1
            },
            getTouchAction: function() {
                return Z.prototype.getTouchAction.call(this)
            },
            attrTest: function(e) {
                var t, n = this.options.direction;
                return n & (Ne | Ie) ? t = e.velocity : n & Ne ? t = e.velocityX : n & Ie && (t = e.velocityY), this._super.attrTest.call(this, e) && n & e.direction && e.distance > this.options.threshold && fe(t) > this.options.velocity && e.eventType & Ee
            },
            emit: function(e) {
                var t = U(e.direction);
                t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e)
            }
        }), u(ie, B, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 2,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [et]
            },
            process: function(e) {
                var t = this.options,
                    n = e.pointers.length === t.pointers,
                    i = e.distance < t.threshold,
                    o = e.deltaTime < t.time;
                if (this.reset(), e.eventType & ke && 0 === this.count) return this.failTimeout();
                if (i && o && n) {
                    if (e.eventType != Ee) return this.failTimeout();
                    var a = !this.pTime || e.timeStamp - this.pTime < t.interval,
                        s = !this.pCenter || I(this.pCenter, e.center) < t.posThreshold;
                    this.pTime = e.timeStamp, this.pCenter = e.center, s && a ? this.count += 1 : this.count = 1, this._input = e;
                    var l = this.count % t.taps;
                    if (0 === l) return this.hasRequireFailures() ? (this._timer = r(function() {
                        this.state = lt, this.tryEmit()
                    }, t.interval, this), ot) : lt
                }
                return ct
            },
            failTimeout: function() {
                return this._timer = r(function() {
                    this.state = ct
                }, this.options.interval, this), ct
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function() {
                this.state == lt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
            }
        }), re.VERSION = "2.0.4", re.defaults = {
            domEvents: !1,
            touchAction: Ze,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [
                [te, {
                    enable: !1
                }],
                [K, {
                        enable: !1
                    },
                    ["rotate"]
                ],
                [ne, {
                    direction: Ne
                }],
                [Z, {
                        direction: Ne
                    },
                    ["swipe"]
                ],
                [ie],
                [ie, {
                        event: "doubletap",
                        taps: 2
                    },
                    ["tap"]
                ],
                [ee]
            ],
            cssProps: {
                userSelect: "default",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var dt = 1,
            ft = 2;
        oe.prototype = {
            set: function(e) {
                return s(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), this.input.target = e.inputTarget, this.input.init()), this
            },
            stop: function(e) {
                this.session.stopped = e ? ft : dt
            },
            recognize: function(e) {
                var t = this.session;
                if (!t.stopped) {
                    this.touchAction.preventDefaults(e);
                    var n, i = this.recognizers,
                        r = t.curRecognizer;
                    (!r || r && r.state & lt) && (r = t.curRecognizer = null);
                    for (var o = 0; o < i.length;) n = i[o], t.stopped === ft || r && n != r && !n.canRecognizeWith(r) ? n.reset() : n.recognize(e), !r && n.state & (ot | at | st) && (r = t.curRecognizer = n), o++
                }
            },
            get: function(e) {
                if (e instanceof B) return e;
                for (var t = this.recognizers, n = 0; n < t.length; n++)
                    if (t[n].options.event == e) return t[n];
                return null
            },
            add: function(e) {
                if (o(e, "add", this)) return this;
                var t = this.get(e.options.event);
                return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e
            },
            remove: function(e) {
                if (o(e, "remove", this)) return this;
                var t = this.recognizers;
                return e = this.get(e), t.splice(y(t, e), 1), this.touchAction.update(), this
            },
            on: function(e, t) {
                var n = this.handlers;
                return a(m(e), function(e) {
                    n[e] = n[e] || [], n[e].push(t)
                }), this
            },
            off: function(e, t) {
                var n = this.handlers;
                return a(m(e), function(e) {
                    t ? n[e].splice(y(n[e], t), 1) : delete n[e]
                }), this
            },
            emit: function(e, t) {
                this.options.domEvents && se(e, t);
                var n = this.handlers[e] && this.handlers[e].slice();
                if (n && n.length) {
                    t.type = e, t.preventDefault = function() {
                        t.srcEvent.preventDefault()
                    };
                    for (var i = 0; i < n.length;) n[i](t), i++
                }
            },
            destroy: function() {
                this.element && ae(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }
        }, s(re, {
            INPUT_START: ke,
            INPUT_MOVE: Se,
            INPUT_END: Ee,
            INPUT_CANCEL: Pe,
            STATE_POSSIBLE: rt,
            STATE_BEGAN: ot,
            STATE_CHANGED: at,
            STATE_ENDED: st,
            STATE_RECOGNIZED: lt,
            STATE_CANCELLED: ut,
            STATE_FAILED: ct,
            DIRECTION_NONE: Ae,
            DIRECTION_LEFT: Oe,
            DIRECTION_RIGHT: De,
            DIRECTION_UP: qe,
            DIRECTION_DOWN: je,
            DIRECTION_HORIZONTAL: Ne,
            DIRECTION_VERTICAL: Ie,
            DIRECTION_ALL: Le,
            Manager: oe,
            Input: k,
            TouchAction: Q,
            TouchInput: z,
            MouseInput: _,
            PointerEventInput: F,
            TouchMouseInput: V,
            SingleTouchInput: $,
            Recognizer: B,
            AttrRecognizer: J,
            Tap: ie,
            Pan: Z,
            Swipe: ne,
            Pinch: K,
            Rotate: te,
            Press: ee,
            on: p,
            off: h,
            each: a,
            merge: l,
            extend: s,
            inherit: u,
            bindFn: c,
            prefixed: w
        }), typeof define == ce && define.amd ? define(function() {
            return re
        }) : "undefined" != typeof module && module.exports ? module.exports = re : e[n] = re
    }(window, document, "Hammer"),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery", "hammerjs"], e) : "object" == typeof exports ? e(require("jquery"), require("hammerjs")) : e(jQuery, Hammer)
    }(function(e, t) {
        function n(n, i) {
            var r = e(n);
            r.data("hammer") || r.data("hammer", new t(r[0], i))
        }
        e.fn.hammer = function(e) {
            return this.each(function() {
                n(this, e)
            })
        }, t.Manager.prototype.emit = function(t) {
            return function(n, i) {
                t.call(this, n, i), e(this.element).trigger({
                    type: n,
                    gesture: i
                })
            }
        }(t.Manager.prototype.emit)
    }),
    function(e) {
        e.Package ? Materialize = {} : e.Materialize = {}
    }(window), Materialize.guid = function() {
        function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return function() {
            return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        }
    }(), Materialize.elementOrParentIsFixed = function(e) {
        var t = $(e),
            n = t.add(t.parents()),
            i = !1;
        return n.each(function() {
            return "fixed" === $(this).css("position") ? (i = !0, !1) : void 0
        }), i
    };
var Vel;
Vel = $ ? $.Velocity : jQuery ? jQuery.Velocity : Velocity,
    function(e) {
        e.fn.collapsible = function(t) {
            var n = {
                accordion: void 0
            };
            return t = e.extend(n, t), this.each(function() {
                function n(t) {
                    s = a.find("> li > .collapsible-header"), t.hasClass("active") ? t.parent().addClass("active") : t.parent().removeClass("active"), t.parent().hasClass("active") ? t.siblings(".collapsible-body").stop(!0, !1).slideDown({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function() {
                            e(this).css("height", "")
                        }
                    }) : t.siblings(".collapsible-body").stop(!0, !1).slideUp({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function() {
                            e(this).css("height", "")
                        }
                    }), s.not(t).removeClass("active").parent().removeClass("active"), s.not(t).parent().children(".collapsible-body").stop(!0, !1).slideUp({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function() {
                            e(this).css("height", "")
                        }
                    })
                }

                function i(t) {
                    t.hasClass("active") ? t.parent().addClass("active") : t.parent().removeClass("active"), t.parent().hasClass("active") ? t.siblings(".collapsible-body").stop(!0, !1).slideDown({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function() {
                            e(this).css("height", "")
                        }
                    }) : t.siblings(".collapsible-body").stop(!0, !1).slideUp({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function() {
                            e(this).css("height", "")
                        }
                    })
                }

                function r(e) {
                    var t = o(e);
                    return t.length > 0
                }

                function o(e) {
                    return e.closest("li > .collapsible-header")
                }
                var a = e(this),
                    s = e(this).find("> li > .collapsible-header"),
                    l = a.data("collapsible");
                a.off("click.collapse", "> li > .collapsible-header"), s.off("click.collapse"), a.on("click.collapse", "> li > .collapsible-header", function(a) {
                    var s = e(this),
                        u = e(a.target);
                    r(u) && (u = o(u)), u.toggleClass("active"), t.accordion || "accordion" === l || void 0 === l ? n(u) : (i(u), s.hasClass("active") && i(s))
                });
                var s = a.find("> li > .collapsible-header");
                t.accordion || "accordion" === l || void 0 === l ? n(s.filter(".active").first()) : s.filter(".active").each(function() {
                    i(e(this))
                })
            })
        }, e(document).ready(function() {
            e(".collapsible").collapsible()
        })
    }(jQuery),
    function(e) {
        e.fn.scrollTo = function(t) {
            return e(this).scrollTop(e(this).scrollTop() - e(this).offset().top + e(t).offset().top), this
        }, e.fn.dropdown = function(t) {
            var n = {
                inDuration: 300,
                outDuration: 225,
                constrain_width: !0,
                hover: !1,
                gutter: 0,
                belowOrigin: !1,
                alignment: "left",
                stopPropagation: !1
            };
            return "open" === t ? (this.each(function() {
                e(this).trigger("open")
            }), !1) : "close" === t ? (this.each(function() {
                e(this).trigger("close")
            }), !1) : void this.each(function() {
                function t() {
                    void 0 !== o.data("induration") && (a.inDuration = o.data("induration")), void 0 !== o.data("outduration") && (a.outDuration = o.data("outduration")), void 0 !== o.data("constrainwidth") && (a.constrain_width = o.data("constrainwidth")), void 0 !== o.data("hover") && (a.hover = o.data("hover")), void 0 !== o.data("gutter") && (a.gutter = o.data("gutter")), void 0 !== o.data("beloworigin") && (a.belowOrigin = o.data("beloworigin")), void 0 !== o.data("alignment") && (a.alignment = o.data("alignment")), void 0 !== o.data("stoppropagation") && (a.stopPropagation = o.data("stoppropagation"))
                }

                function i(n) {
                    "focus" === n && (s = !0), t(), l.addClass("active"), o.addClass("active"), a.constrain_width === !0 ? l.css("width", o.outerWidth()) : l.css("white-space", "nowrap");
                    var i = window.innerHeight,
                        r = o.innerHeight(),
                        u = o.offset().left,
                        c = o.offset().top - e(window).scrollTop(),
                        d = a.alignment,
                        f = 0,
                        p = 0,
                        h = 0;
                    a.belowOrigin === !0 && (h = r);
                    var v = 0,
                        g = 0,
                        m = o.parent();
                    if (m.is("body") || (m[0].scrollHeight > m[0].clientHeight && (v = m[0].scrollTop), m[0].scrollWidth > m[0].clientWidth && (g = m[0].scrollLeft)), u + l.innerWidth() > e(window).width() ? d = "right" : u - l.innerWidth() + o.innerWidth() < 0 && (d = "left"), c + l.innerHeight() > i)
                        if (c + r - l.innerHeight() < 0) {
                            var y = i - c - h;
                            l.css("max-height", y)
                        } else h || (h += r), h -= l.innerHeight();
                    if ("left" === d) f = a.gutter, p = o.position().left + f;
                    else if ("right" === d) {
                        var b = o.position().left + o.outerWidth() - l.outerWidth();
                        f = -a.gutter, p = b + f
                    }
                    l.css({
                        position: "absolute",
                        top: o.position().top + h + v,
                        left: p + g
                    }), l.stop(!0, !0).css("opacity", 0).slideDown({
                        queue: !1,
                        duration: a.inDuration,
                        easing: "easeOutCubic",
                        complete: function() {
                            e(this).css("height", "")
                        }
                    }).animate({
                        opacity: 1
                    }, {
                        queue: !1,
                        duration: a.inDuration,
                        easing: "easeOutSine"
                    })
                }

                function r() {
                    s = !1, l.fadeOut(a.outDuration), l.removeClass("active"), o.removeClass("active"), setTimeout(function() {
                        l.css("max-height", "")
                    }, a.outDuration)
                }
                var o = e(this),
                    a = e.extend({}, n, a),
                    s = !1,
                    l = e("#" + o.attr("data-activates"));
                if (t(), o.after(l), a.hover) {
                    var u = !1;
                    o.unbind("click." + o.attr("id")), o.on("mouseenter", function(e) {
                        u === !1 && (i(), u = !0)
                    }), o.on("mouseleave", function(t) {
                        var n = t.toElement || t.relatedTarget;
                        e(n).closest(".dropdown-content").is(l) || (l.stop(!0, !0), r(), u = !1)
                    }), l.on("mouseleave", function(t) {
                        var n = t.toElement || t.relatedTarget;
                        e(n).closest(".dropdown-button").is(o) || (l.stop(!0, !0), r(), u = !1)
                    })
                } else o.unbind("click." + o.attr("id")), o.bind("click." + o.attr("id"), function(t) {
                    s || (o[0] != t.currentTarget || o.hasClass("active") || 0 !== e(t.target).closest(".dropdown-content").length ? o.hasClass("active") && (r(), e(document).unbind("click." + l.attr("id") + " touchstart." + l.attr("id"))) : (t.preventDefault(), a.stopPropagation && t.stopPropagation(), i("click")), l.hasClass("active") && e(document).bind("click." + l.attr("id") + " touchstart." + l.attr("id"), function(t) {
                        l.is(t.target) || o.is(t.target) || o.find(t.target).length || (r(), e(document).unbind("click." + l.attr("id") + " touchstart." + l.attr("id")))
                    }))
                });
                o.on("open", function(e, t) {
                    i(t)
                }), o.on("close", r)
            })
        }, e(document).ready(function() {
            e(".dropdown-button").dropdown()
        })
    }(jQuery),
    function(e) {
        var t = 0,
            n = 0,
            i = function() {
                return n++, "materialize-lean-overlay-" + n
            };
        e.fn.extend({
            openModal: function(n) {
                var r = e("body"),
                    o = r.innerWidth();
                r.css("overflow", "hidden"), r.width(o);
                var a = {
                        opacity: .5,
                        in_duration: 350,
                        out_duration: 250,
                        ready: void 0,
                        complete: void 0,
                        dismissible: !0,
                        starting_top: "4%",
                        ending_top: "10%"
                    },
                    s = e(this);
                if (!s.hasClass("open")) {
                    var l = i(),
                        u = e('<div class="lean-overlay"></div>');
                    lStack = ++t, u.attr("id", l).css("z-index", 1e3 + 2 * lStack), s.data("overlay-id", l).css("z-index", 1e3 + 2 * lStack + 1), s.addClass("open"), e("body").append(u), n = e.extend(a, n), n.dismissible && (u.click(function() {
                        s.closeModal(n)
                    }), e(document).on("keyup.leanModal" + l, function(e) {
                        27 === e.keyCode && s.closeModal(n)
                    })), s.find(".modal-close").on("click.close", function(e) {
                        s.closeModal(n)
                    }), u.css({
                        display: "block",
                        opacity: 0
                    }), s.css({
                        display: "block",
                        opacity: 0
                    }), u.velocity({
                        opacity: n.opacity
                    }, {
                        duration: n.in_duration,
                        queue: !1,
                        ease: "easeOutCubic"
                    }), s.data("associated-overlay", u[0]), s.hasClass("bottom-sheet") ? s.velocity({
                        bottom: "0",
                        opacity: 1
                    }, {
                        duration: n.in_duration,
                        queue: !1,
                        ease: "easeOutCubic",
                        complete: function() {
                            "function" == typeof n.ready && n.ready()
                        }
                    }) : (e.Velocity.hook(s, "scaleX", .7), s.css({
                        top: n.starting_top
                    }), s.velocity({
                        top: n.ending_top,
                        opacity: 1,
                        scaleX: "1"
                    }, {
                        duration: n.in_duration,
                        queue: !1,
                        ease: "easeOutCubic",
                        complete: function() {
                            "function" == typeof n.ready && n.ready()
                        }
                    }))
                }
            }
        }), e.fn.extend({
            closeModal: function(n) {
                var i = {
                        out_duration: 250,
                        complete: void 0
                    },
                    r = e(this),
                    o = r.data("overlay-id"),
                    a = e("#" + o);
                r.removeClass("open"), n = e.extend(i, n), e("body").css({
                    overflow: "",
                    width: ""
                }), r.find(".modal-close").off("click.close"), e(document).off("keyup.leanModal" + o), a.velocity({
                    opacity: 0
                }, {
                    duration: n.out_duration,
                    queue: !1,
                    ease: "easeOutQuart"
                }), r.hasClass("bottom-sheet") ? r.velocity({
                    bottom: "-100%",
                    opacity: 0
                }, {
                    duration: n.out_duration,
                    queue: !1,
                    ease: "easeOutCubic",
                    complete: function() {
                        a.css({
                            display: "none"
                        }), "function" == typeof n.complete && n.complete(), a.remove(), t--
                    }
                }) : r.velocity({
                    top: n.starting_top,
                    opacity: 0,
                    scaleX: .7
                }, {
                    duration: n.out_duration,
                    complete: function() {
                        e(this).css("display", "none"), "function" == typeof n.complete && n.complete(), a.remove(), t--
                    }
                })
            }
        }), e.fn.extend({
            leanModal: function(t) {
                return this.each(function() {
                    var n = {
                            starting_top: "4%"
                        },
                        i = e.extend(n, t);
                    e(this).click(function(t) {
                        i.starting_top = (e(this).offset().top - e(window).scrollTop()) / 1.15;
                        var n = e(this).attr("href") || "#" + e(this).data("target");
                        e(n).openModal(i), t.preventDefault()
                    })
                })
            }
        })
    }(jQuery),
    function(e) {
        e.fn.materialbox = function() {
            return this.each(function() {
                function t() {
                    o = !1;
                    var t = l.parent(".material-placeholder"),
                        i = (window.innerWidth, window.innerHeight, l.data("width")),
                        a = l.data("height");
                    l.velocity("stop", !0), e("#materialbox-overlay").velocity("stop", !0), e(".materialbox-caption").velocity("stop", !0), e("#materialbox-overlay").velocity({
                        opacity: 0
                    }, {
                        duration: s,
                        queue: !1,
                        easing: "easeOutQuad",
                        complete: function() {
                            r = !1, e(this).remove()
                        }
                    }), l.velocity({
                        width: i,
                        height: a,
                        left: 0,
                        top: 0
                    }, {
                        duration: s,
                        queue: !1,
                        easing: "easeOutQuad"
                    }), e(".materialbox-caption").velocity({
                        opacity: 0
                    }, {
                        duration: s,
                        queue: !1,
                        easing: "easeOutQuad",
                        complete: function() {
                            t.css({
                                height: "",
                                width: "",
                                position: "",
                                top: "",
                                left: ""
                            }), l.css({
                                height: "",
                                top: "",
                                left: "",
                                width: "",
                                "max-width": "",
                                position: "",
                                "z-index": ""
                            }), l.removeClass("active"), o = !0, e(this).remove(), n && n.css("overflow", "")
                        }
                    })
                }
                if (!e(this).hasClass("initialized")) {
                    e(this).addClass("initialized");
                    var n, i, r = !1,
                        o = !0,
                        a = 275,
                        s = 200,
                        l = e(this),
                        u = e("<div></div>").addClass("material-placeholder");
                    l.wrap(u), l.on("click", function() {
                        var s = l.parent(".material-placeholder"),
                            u = window.innerWidth,
                            c = window.innerHeight,
                            d = l.width(),
                            f = l.height();
                        if (o === !1) return t(), !1;
                        if (r && o === !0) return t(), !1;
                        for (o = !1, l.addClass("active"), r = !0, s.css({
                                width: s[0].getBoundingClientRect().width,
                                height: s[0].getBoundingClientRect().height,
                                position: "relative",
                                top: 0,
                                left: 0
                            }), n = void 0, i = s[0].parentNode; null !== i && !e(i).is(document);) {
                            var p = e(i);
                            "visible" !== p.css("overflow") && (p.css("overflow", "visible"), n = void 0 === n ? p : n.add(p)), i = i.parentNode
                        }
                        l.css({
                            position: "absolute",
                            "z-index": 1e3
                        }).data("width", d).data("height", f);
                        var h = e('<div id="materialbox-overlay"></div>').css({
                            opacity: 0
                        }).click(function() {
                            o === !0 && t()
                        });
                        if (l.before(h), h.velocity({
                                opacity: 1
                            }, {
                                duration: a,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), "" !== l.data("caption")) {
                            var v = e('<div class="materialbox-caption"></div>');
                            v.text(l.data("caption")), e("body").append(v), v.css({
                                display: "inline"
                            }), v.velocity({
                                opacity: 1
                            }, {
                                duration: a,
                                queue: !1,
                                easing: "easeOutQuad"
                            })
                        }
                        var g = 0,
                            m = d / u,
                            y = f / c,
                            b = 0,
                            x = 0;
                        m > y ? (g = f / d, b = .9 * u, x = .9 * u * g) : (g = d / f, b = .9 * c * g, x = .9 * c), l.hasClass("responsive-img") ? l.velocity({
                            "max-width": b,
                            width: d
                        }, {
                            duration: 0,
                            queue: !1,
                            complete: function() {
                                l.css({
                                    left: 0,
                                    top: 0
                                }).velocity({
                                    height: x,
                                    width: b,
                                    left: e(document).scrollLeft() + u / 2 - l.parent(".material-placeholder").offset().left - b / 2,
                                    top: e(document).scrollTop() + c / 2 - l.parent(".material-placeholder").offset().top - x / 2
                                }, {
                                    duration: a,
                                    queue: !1,
                                    easing: "easeOutQuad",
                                    complete: function() {
                                        o = !0
                                    }
                                })
                            }
                        }) : l.css("left", 0).css("top", 0).velocity({
                            height: x,
                            width: b,
                            left: e(document).scrollLeft() + u / 2 - l.parent(".material-placeholder").offset().left - b / 2,
                            top: e(document).scrollTop() + c / 2 - l.parent(".material-placeholder").offset().top - x / 2
                        }, {
                            duration: a,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                o = !0
                            }
                        })
                    }), e(window).scroll(function() {
                        r && t()
                    }), e(document).keyup(function(e) {
                        27 === e.keyCode && o === !0 && r && t()
                    })
                }
            })
        }, e(document).ready(function() {
            e(".materialboxed").materialbox()
        })
    }(jQuery),
    function(e) {
        e.fn.parallax = function() {
            var t = e(window).width();
            return this.each(function(n) {
                function i(n) {
                    var i;
                    i = 601 > t ? r.height() > 0 ? r.height() : r.children("img").height() : r.height() > 0 ? r.height() : 500;
                    var o = r.children("img").first(),
                        a = o.height(),
                        s = a - i,
                        l = r.offset().top + i,
                        u = r.offset().top,
                        c = e(window).scrollTop(),
                        d = window.innerHeight,
                        f = c + d,
                        p = (f - u) / (i + d),
                        h = Math.round(s * p);
                    n && o.css("display", "block"), l > c && c + d > u && o.css("transform", "translate3D(-50%," + h + "px, 0)")
                }
                var r = e(this);
                r.addClass("parallax"), r.children("img").one("load", function() {
                    i(!0)
                }).each(function() {
                    this.complete && e(this).load()
                }), e(window).scroll(function() {
                    t = e(window).width(), i(!1)
                }), e(window).resize(function() {
                    t = e(window).width(), i(!1)
                })
            })
        }
    }(jQuery),
    function(e) {
        var t = {
            init: function(t) {
                var n = {
                    onShow: null
                };
                return t = e.extend(n, t), this.each(function() {
                    var n = e(this);
                    e(window).width(), n.width("100%");
                    var i, r, o = n.find("li.tab a"),
                        a = n.width(),
                        s = Math.max(a, n[0].scrollWidth) / o.length,
                        l = 0;
                    i = e(o.filter('[href="' + location.hash + '"]')), 0 === i.length && (i = e(this).find("li.tab a.active").first()), 0 === i.length && (i = e(this).find("li.tab a").first()), i.addClass("active"), l = o.index(i), 0 > l && (l = 0), void 0 !== i[0] && (r = e(i[0].hash)), n.append('<div class="indicator"></div>');
                    var u = n.find(".indicator");
                    n.is(":visible") && (u.css({
                        right: a - (l + 1) * s
                    }), u.css({
                        left: l * s
                    })), e(window).resize(function() {
                        a = n.width(), s = Math.max(a, n[0].scrollWidth) / o.length, 0 > l && (l = 0), 0 !== s && 0 !== a && (u.css({
                            right: a - (l + 1) * s
                        }), u.css({
                            left: l * s
                        }))
                    }), o.not(i).each(function() {
                        e(this.hash).hide()
                    }), n.on("click", "a", function(c) {
                        if (e(this).parent().hasClass("disabled")) return void c.preventDefault();
                        if (!e(this).attr("target")) {
                            a = n.width(), s = Math.max(a, n[0].scrollWidth) / o.length, i.removeClass("active"), void 0 !== r && r.hide(), i = e(this), r = e(this.hash), o = n.find("li.tab a"), i.addClass("active");
                            var d = l;
                            l = o.index(e(this)), 0 > l && (l = 0), void 0 !== r && (r.show(), "function" == typeof t.onShow && t.onShow.call(this, r)), l - d >= 0 ? (u.velocity({
                                right: a - (l + 1) * s
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), u.velocity({
                                left: l * s
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad",
                                delay: 90
                            })) : (u.velocity({
                                left: l * s
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), u.velocity({
                                right: a - (l + 1) * s
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad",
                                delay: 90
                            })), c.preventDefault()
                        }
                    })
                })
            },
            select_tab: function(e) {
                this.find('a[href="#' + e + '"]').trigger("click")
            }
        };
        e.fn.tabs = function(n) {
            return t[n] ? t[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void e.error("Method " + n + " does not exist on jQuery.tooltip") : t.init.apply(this, arguments)
        }, e(document).ready(function() {
            e("ul.tabs").tabs()
        })
    }(jQuery),
    function(e) {
        e.fn.tooltip = function(n) {
            var i = 5,
                r = {
                    delay: 350,
                    tooltip: "",
                    position: "bottom",
                    html: !1
                };
            return "remove" === n ? (this.each(function() {
                e("#" + e(this).attr("data-tooltip-id")).remove(), e(this).off("mouseenter.tooltip mouseleave.tooltip")
            }), !1) : (n = e.extend(r, n), this.each(function() {
                var r = Materialize.guid(),
                    o = e(this);
                o.attr("data-tooltip-id", r);
                var a, s, l, u, c, d, f = function() {
                    a = o.attr("data-html") ? "true" === o.attr("data-html") : n.html, s = o.attr("data-delay"), s = void 0 === s || "" === s ? n.delay : s, l = o.attr("data-position"), l = void 0 === l || "" === l ? n.position : l, u = o.attr("data-tooltip"), u = void 0 === u || "" === u ? n.tooltip : u
                };
                f();
                var p = function() {
                    var t = e('<div class="material-tooltip"></div>');
                    return u = a ? e("<span></span>").html(u) : e("<span></span>").text(u), t.append(u).appendTo(e("body")).attr("id", r), d = e('<div class="backdrop"></div>'), d.appendTo(t), t
                };
                c = p(), o.off("mouseenter.tooltip mouseleave.tooltip");
                var h, v = !1;
                o.on({
                    "mouseenter.tooltip": function(e) {
                        var n = function() {
                            f(), v = !0, c.velocity("stop"), d.velocity("stop"), c.css({
                                display: "block",
                                left: "0px",
                                top: "0px"
                            });
                            var e, n, r, a = o.outerWidth(),
                                s = o.outerHeight(),
                                u = c.outerHeight(),
                                p = c.outerWidth(),
                                h = "0px",
                                g = "0px",
                                m = 8,
                                y = 8;
                            "top" === l ? (e = o.offset().top - u - i, n = o.offset().left + a / 2 - p / 2, r = t(n, e, p, u), h = "-10px", d.css({
                                bottom: 0,
                                left: 0,
                                borderRadius: "14px 14px 0 0",
                                transformOrigin: "50% 100%",
                                marginTop: u,
                                marginLeft: p / 2 - d.width() / 2
                            })) : "left" === l ? (e = o.offset().top + s / 2 - u / 2, n = o.offset().left - p - i, r = t(n, e, p, u), g = "-10px", d.css({
                                top: "-7px",
                                right: 0,
                                width: "14px",
                                height: "14px",
                                borderRadius: "14px 0 0 14px",
                                transformOrigin: "95% 50%",
                                marginTop: u / 2,
                                marginLeft: p
                            })) : "right" === l ? (e = o.offset().top + s / 2 - u / 2, n = o.offset().left + a + i, r = t(n, e, p, u), g = "+10px", d.css({
                                top: "-7px",
                                left: 0,
                                width: "14px",
                                height: "14px",
                                borderRadius: "0 14px 14px 0",
                                transformOrigin: "5% 50%",
                                marginTop: u / 2,
                                marginLeft: "0px"
                            })) : (e = o.offset().top + o.outerHeight() + i, n = o.offset().left + a / 2 - p / 2, r = t(n, e, p, u), h = "+10px", d.css({
                                top: 0,
                                left: 0,
                                marginLeft: p / 2 - d.width() / 2
                            })), c.css({
                                top: r.y,
                                left: r.x
                            }), m = Math.SQRT2 * p / parseInt(d.css("width")), y = Math.SQRT2 * u / parseInt(d.css("height")), c.velocity({
                                marginTop: h,
                                marginLeft: g
                            }, {
                                duration: 350,
                                queue: !1
                            }).velocity({
                                opacity: 1
                            }, {
                                duration: 300,
                                delay: 50,
                                queue: !1
                            }), d.css({
                                display: "block"
                            }).velocity({
                                opacity: 1
                            }, {
                                duration: 55,
                                delay: 0,
                                queue: !1
                            }).velocity({
                                scaleX: m,
                                scaleY: y
                            }, {
                                duration: 300,
                                delay: 0,
                                queue: !1,
                                easing: "easeInOutQuad"
                            })
                        };
                        h = setTimeout(n, s)
                    },
                    "mouseleave.tooltip": function() {
                        v = !1, clearTimeout(h), setTimeout(function() {
                            v !== !0 && (c.velocity({
                                opacity: 0,
                                marginTop: 0,
                                marginLeft: 0
                            }, {
                                duration: 225,
                                queue: !1
                            }), d.velocity({
                                opacity: 0,
                                scaleX: 1,
                                scaleY: 1
                            }, {
                                duration: 225,
                                queue: !1,
                                complete: function() {
                                    d.css("display", "none"), c.css("display", "none"), v = !1
                                }
                            }))
                        }, 225)
                    }
                })
            }))
        };
        var t = function(t, n, i, r) {
            var o = t,
                a = n;
            return 0 > o ? o = 4 : o + i > window.innerWidth && (o -= o + i - window.innerWidth), 0 > a ? a = 4 : a + r > window.innerHeight + e(window).scrollTop && (a -= a + r - window.innerHeight), {
                x: o,
                y: a
            }
        };
        e(document).ready(function() {
            e(".tooltipped").tooltip()
        })
    }(jQuery),
    function(e) {
        "use strict";

        function t(e) {
            return null !== e && e === e.window
        }

        function n(e) {
            return t(e) ? e : 9 === e.nodeType && e.defaultView
        }

        function i(e) {
            var t, i, r = {
                    top: 0,
                    left: 0
                },
                o = e && e.ownerDocument;
            return t = o.documentElement, "undefined" != typeof e.getBoundingClientRect && (r = e.getBoundingClientRect()), i = n(o), {
                top: r.top + i.pageYOffset - t.clientTop,
                left: r.left + i.pageXOffset - t.clientLeft
            }
        }

        function r(e) {
            var t = "";
            for (var n in e) e.hasOwnProperty(n) && (t += n + ":" + e[n] + ";");
            return t
        }

        function o(e) {
            if (c.allowEvent(e) === !1) return null;
            for (var t = null, n = e.target || e.srcElement; null !== n.parentElement;) {
                if (!(n instanceof SVGElement || -1 === n.className.indexOf("waves-effect"))) {
                    t = n;
                    break
                }
                if (n.classList.contains("waves-effect")) {
                    t = n;
                    break
                }
                n = n.parentElement
            }
            return t
        }

        function a(t) {
            var n = o(t);
            null !== n && (u.show(t, n), "ontouchstart" in e && (n.addEventListener("touchend", u.hide, !1), n.addEventListener("touchcancel", u.hide, !1)), n.addEventListener("mouseup", u.hide, !1), n.addEventListener("mouseleave", u.hide, !1))
        }
        var s = s || {},
            l = document.querySelectorAll.bind(document),
            u = {
                duration: 750,
                show: function(e, t) {
                    if (2 === e.button) return !1;
                    var n = t || this,
                        o = document.createElement("div");
                    o.className = "waves-ripple", n.appendChild(o);
                    var a = i(n),
                        s = e.pageY - a.top,
                        l = e.pageX - a.left,
                        c = "scale(" + n.clientWidth / 100 * 10 + ")";
                    "touches" in e && (s = e.touches[0].pageY - a.top, l = e.touches[0].pageX - a.left), o.setAttribute("data-hold", Date.now()), o.setAttribute("data-scale", c), o.setAttribute("data-x", l), o.setAttribute("data-y", s);
                    var d = {
                        top: s + "px",
                        left: l + "px"
                    };
                    o.className = o.className + " waves-notransition", o.setAttribute("style", r(d)), o.className = o.className.replace("waves-notransition", ""), d["-webkit-transform"] = c, d["-moz-transform"] = c, d["-ms-transform"] = c, d["-o-transform"] = c, d.transform = c, d.opacity = "1", d["-webkit-transition-duration"] = u.duration + "ms", d["-moz-transition-duration"] = u.duration + "ms", d["-o-transition-duration"] = u.duration + "ms", d["transition-duration"] = u.duration + "ms", d["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", d["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", d["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", d["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", o.setAttribute("style", r(d))
                },
                hide: function(e) {
                    c.touchup(e);
                    var t = this,
                        n = (1.4 * t.clientWidth, null),
                        i = t.getElementsByClassName("waves-ripple");
                    if (!(i.length > 0)) return !1;
                    n = i[i.length - 1];
                    var o = n.getAttribute("data-x"),
                        a = n.getAttribute("data-y"),
                        s = n.getAttribute("data-scale"),
                        l = Date.now() - Number(n.getAttribute("data-hold")),
                        d = 350 - l;
                    0 > d && (d = 0), setTimeout(function() {
                        var e = {
                            top: a + "px",
                            left: o + "px",
                            opacity: "0",
                            "-webkit-transition-duration": u.duration + "ms",
                            "-moz-transition-duration": u.duration + "ms",
                            "-o-transition-duration": u.duration + "ms",
                            "transition-duration": u.duration + "ms",
                            "-webkit-transform": s,
                            "-moz-transform": s,
                            "-ms-transform": s,
                            "-o-transform": s,
                            transform: s
                        };
                        n.setAttribute("style", r(e)), setTimeout(function() {
                            try {
                                t.removeChild(n)
                            } catch (e) {
                                return !1
                            }
                        }, u.duration)
                    }, d)
                },
                wrapInput: function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        if ("input" === n.tagName.toLowerCase()) {
                            var i = n.parentNode;
                            if ("i" === i.tagName.toLowerCase() && -1 !== i.className.indexOf("waves-effect")) continue;
                            var r = document.createElement("i");
                            r.className = n.className + " waves-input-wrapper";
                            var o = n.getAttribute("style");
                            o || (o = ""), r.setAttribute("style", o), n.className = "waves-button-input", n.removeAttribute("style"), i.replaceChild(r, n), r.appendChild(n)
                        }
                    }
                }
            },
            c = {
                touches: 0,
                allowEvent: function(e) {
                    var t = !0;
                    return "touchstart" === e.type ? c.touches += 1 : "touchend" === e.type || "touchcancel" === e.type ? setTimeout(function() {
                        c.touches > 0 && (c.touches -= 1)
                    }, 500) : "mousedown" === e.type && c.touches > 0 && (t = !1), t
                },
                touchup: function(e) {
                    c.allowEvent(e)
                }
            };
        s.displayEffect = function(t) {
            t = t || {}, "duration" in t && (u.duration = t.duration), u.wrapInput(l(".waves-effect")), "ontouchstart" in e && document.body.addEventListener("touchstart", a, !1), document.body.addEventListener("mousedown", a, !1)
        }, s.attach = function(t) {
            "input" === t.tagName.toLowerCase() && (u.wrapInput([t]), t = t.parentElement), "ontouchstart" in e && t.addEventListener("touchstart", a, !1), t.addEventListener("mousedown", a, !1)
        }, e.Waves = s, document.addEventListener("DOMContentLoaded", function() {
            s.displayEffect()
        }, !1)
    }(window), Materialize.toast = function(e, t, n, i) {
        function r(e) {
            var t = document.createElement("div");
            if (t.classList.add("toast"), n)
                for (var r = n.split(" "), o = 0, a = r.length; a > o; o++) t.classList.add(r[o]);
            ("object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) ? t.appendChild(e): e instanceof jQuery ? t.appendChild(e[0]) : t.innerHTML = e;
            var s = new Hammer(t, {
                prevent_default: !1
            });
            return s.on("pan", function(e) {
                var n = e.deltaX,
                    i = 80;
                t.classList.contains("panning") || t.classList.add("panning");
                var r = 1 - Math.abs(n / i);
                0 > r && (r = 0), Vel(t, {
                    left: n,
                    opacity: r
                }, {
                    duration: 50,
                    queue: !1,
                    easing: "easeOutQuad"
                })
            }), s.on("panend", function(e) {
                var n = e.deltaX,
                    r = 80;
                Math.abs(n) > r ? Vel(t, {
                    marginTop: "-40px"
                }, {
                    duration: 375,
                    easing: "easeOutExpo",
                    queue: !1,
                    complete: function() {
                        "function" == typeof i && i(), t.parentNode.removeChild(t)
                    }
                }) : (t.classList.remove("panning"), Vel(t, {
                    left: 0,
                    opacity: 1
                }, {
                    duration: 300,
                    easing: "easeOutExpo",
                    queue: !1
                }))
            }), t
        }
        n = n || "";
        var o = document.getElementById("toast-container");
        null === o && (o = document.createElement("div"), o.id = "toast-container", document.body.appendChild(o));
        var a = r(e);
        e && o.appendChild(a), a.style.top = "35px", a.style.opacity = 0, Vel(a, {
            top: "0px",
            opacity: 1
        }, {
            duration: 300,
            easing: "easeOutCubic",
            queue: !1
        });
        var s = t,
            l = setInterval(function() {
                null === a.parentNode && window.clearInterval(l), a.classList.contains("panning") || (s -= 20), 0 >= s && (Vel(a, {
                    opacity: 0,
                    marginTop: "-40px"
                }, {
                    duration: 375,
                    easing: "easeOutExpo",
                    queue: !1,
                    complete: function() {
                        "function" == typeof i && i(), this[0].parentNode.removeChild(this[0])
                    }
                }), window.clearInterval(l))
            }, 20)
    },
    function(e) {
        var t = {
            init: function(t) {
                var n = {
                    menuWidth: 300,
                    edge: "left",
                    closeOnClick: !1
                };
                t = e.extend(n, t), e(this).each(function() {
                    function n(n) {
                        a = !1, s = !1, e("body").css({
                            overflow: "",
                            width: ""
                        }), e("#sidenav-overlay").velocity({
                            opacity: 0
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                e(this).remove()
                            }
                        }), "left" === t.edge ? (o.css({
                            width: "",
                            right: "",
                            left: "0"
                        }), r.velocity({
                            translateX: "-100%"
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutCubic",
                            complete: function() {
                                n === !0 && (r.removeAttr("style"), r.css("width", t.menuWidth))
                            }
                        })) : (o.css({
                            width: "",
                            right: "0",
                            left: ""
                        }), r.velocity({
                            translateX: "100%"
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutCubic",
                            complete: function() {
                                n === !0 && (r.removeAttr("style"), r.css("width", t.menuWidth))
                            }
                        }))
                    }
                    var i = e(this),
                        r = e("#" + i.attr("data-activates"));
                    300 != t.menuWidth && r.css("width", t.menuWidth);
                    var o = e('<div class="drag-target"></div>');
                    e("body").append(o), "left" == t.edge ? (r.css("transform", "translateX(-100%)"), o.css({
                        left: 0
                    })) : (r.addClass("right-aligned").css("transform", "translateX(100%)"), o.css({
                        right: 0
                    })), r.hasClass("fixed") && window.innerWidth > 992 && r.css("transform", "translateX(0)"), r.hasClass("fixed") && e(window).resize(function() {
                        window.innerWidth > 992 ? 0 !== e("#sidenav-overlay").length && s ? n(!0) : r.css("transform", "translateX(0%)") : s === !1 && ("left" === t.edge ? r.css("transform", "translateX(-100%)") : r.css("transform", "translateX(100%)"))
                    }), t.closeOnClick === !0 && r.on("click.itemclick", "a:not(.collapsible-header)", function() {
                        n()
                    });
                    var a = !1,
                        s = !1;
                    o.on("click", function() {
                        s && n()
                    }), o.hammer({
                        prevent_default: !1
                    }).bind("pan", function(i) {
                        if ("touch" == i.gesture.pointerType) {
                            var o = (i.gesture.direction, i.gesture.center.x),
                                a = (i.gesture.center.y, i.gesture.velocityX, e("body")),
                                l = a.innerWidth();
                            if (a.css("overflow", "hidden"), a.width(l), 0 === e("#sidenav-overlay").length) {
                                var u = e('<div id="sidenav-overlay"></div>');
                                u.css("opacity", 0).click(function() {
                                    n()
                                }), e("body").append(u)
                            }
                            if ("left" === t.edge && (o > t.menuWidth ? o = t.menuWidth : 0 > o && (o = 0)), "left" === t.edge) o < t.menuWidth / 2 ? s = !1 : o >= t.menuWidth / 2 && (s = !0), r.css("transform", "translateX(" + (o - t.menuWidth) + "px)");
                            else {
                                o < window.innerWidth - t.menuWidth / 2 ? s = !0 : o >= window.innerWidth - t.menuWidth / 2 && (s = !1);
                                var c = o - t.menuWidth / 2;
                                0 > c && (c = 0), r.css("transform", "translateX(" + c + "px)")
                            }
                            var d;
                            "left" === t.edge ? (d = o / t.menuWidth, e("#sidenav-overlay").velocity({
                                opacity: d
                            }, {
                                duration: 10,
                                queue: !1,
                                easing: "easeOutQuad"
                            })) : (d = Math.abs((o - window.innerWidth) / t.menuWidth), e("#sidenav-overlay").velocity({
                                opacity: d
                            }, {
                                duration: 10,
                                queue: !1,
                                easing: "easeOutQuad"
                            }))
                        }
                    }).bind("panend", function(n) {
                        if ("touch" == n.gesture.pointerType) {
                            var i = n.gesture.velocityX,
                                l = n.gesture.center.x,
                                u = l - t.menuWidth,
                                c = l - t.menuWidth / 2;
                            u > 0 && (u = 0), 0 > c && (c = 0), a = !1, "left" === t.edge ? s && .3 >= i || -.5 > i ? (0 !== u && r.velocity({
                                translateX: [0, u]
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), e("#sidenav-overlay").velocity({
                                opacity: 1
                            }, {
                                duration: 50,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), o.css({
                                width: "50%",
                                right: 0,
                                left: ""
                            }), s = !0) : (!s || i > .3) && (e("body").css({
                                overflow: "",
                                width: ""
                            }), r.velocity({
                                translateX: [-1 * t.menuWidth - 10, u]
                            }, {
                                duration: 200,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), e("#sidenav-overlay").velocity({
                                opacity: 0
                            }, {
                                duration: 200,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function() {
                                    e(this).remove()
                                }
                            }), o.css({
                                width: "10px",
                                right: "",
                                left: 0
                            })) : s && i >= -.3 || i > .5 ? (0 !== c && r.velocity({
                                translateX: [0, c]
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), e("#sidenav-overlay").velocity({
                                opacity: 1
                            }, {
                                duration: 50,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), o.css({
                                width: "50%",
                                right: "",
                                left: 0
                            }), s = !0) : (!s || -.3 > i) && (e("body").css({
                                overflow: "",
                                width: ""
                            }), r.velocity({
                                translateX: [t.menuWidth + 10, c]
                            }, {
                                duration: 200,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), e("#sidenav-overlay").velocity({
                                opacity: 0
                            }, {
                                duration: 200,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function() {
                                    e(this).remove()
                                }
                            }), o.css({
                                width: "10px",
                                right: 0,
                                left: ""
                            }))
                        }
                    }), i.click(function() {
                        if (s === !0) s = !1, a = !1, n();
                        else {
                            var i = e("body"),
                                l = i.innerWidth();
                            i.css("overflow", "hidden"), i.width(l), e("body").append(o), "left" === t.edge ? (o.css({
                                width: "50%",
                                right: 0,
                                left: ""
                            }), r.velocity({
                                translateX: [0, -1 * t.menuWidth]
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            })) : (o.css({
                                width: "50%",
                                right: "",
                                left: 0
                            }), r.velocity({
                                translateX: [0, t.menuWidth]
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }));
                            var u = e('<div id="sidenav-overlay"></div>');
                            u.css("opacity", 0).click(function() {
                                s = !1, a = !1, n(), u.velocity({
                                    opacity: 0
                                }, {
                                    duration: 300,
                                    queue: !1,
                                    easing: "easeOutQuad",
                                    complete: function() {
                                        e(this).remove()
                                    }
                                })
                            }), e("body").append(u), u.velocity({
                                opacity: 1
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function() {
                                    s = !0, a = !1
                                }
                            })
                        }
                        return !1
                    })
                })
            },
            show: function() {
                this.trigger("click")
            },
            hide: function() {
                e("#sidenav-overlay").trigger("click")
            }
        };
        e.fn.sideNav = function(n) {
            return t[n] ? t[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void e.error("Method " + n + " does not exist on jQuery.sideNav") : t.init.apply(this, arguments)
        }
    }(jQuery),
    function(e) {
        function t(t, n, i, r) {
            var o = e();
            return e.each(a, function(e, a) {
                if (a.height() > 0) {
                    var s = a.offset().top,
                        l = a.offset().left,
                        u = l + a.width(),
                        c = s + a.height(),
                        d = !(l > n || r > u || s > i || t > c);
                    d && o.push(a)
                }
            }), o
        }

        function n() {
            ++u;
            var n = o.scrollTop(),
                i = o.scrollLeft(),
                r = i + o.width(),
                a = n + o.height(),
                l = t(n + c.top + 200, r + c.right, a + c.bottom, i + c.left);
            e.each(l, function(e, t) {
                var n = t.data("scrollSpy:ticks");
                "number" != typeof n && t.triggerHandler("scrollSpy:enter"), t.data("scrollSpy:ticks", u)
            }), e.each(s, function(e, t) {
                var n = t.data("scrollSpy:ticks");
                "number" == typeof n && n !== u && (t.triggerHandler("scrollSpy:exit"), t.data("scrollSpy:ticks", null))
            }), s = l
        }

        function i() {
            o.trigger("scrollSpy:winSize")
        }

        function r(e, t, n) {
            var i, r, o, a = null,
                s = 0;
            n || (n = {});
            var l = function() {
                s = n.leading === !1 ? 0 : d(), a = null, o = e.apply(i, r), i = r = null
            };
            return function() {
                var u = d();
                s || n.leading !== !1 || (s = u);
                var c = t - (u - s);
                return i = this, r = arguments, 0 >= c ? (clearTimeout(a), a = null, s = u, o = e.apply(i, r), i = r = null) : a || n.trailing === !1 || (a = setTimeout(l, c)), o
            }
        }
        var o = e(window),
            a = [],
            s = [],
            l = !1,
            u = 0,
            c = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            d = Date.now || function() {
                return (new Date).getTime()
            };
        e.scrollSpy = function(t, i) {
            var s = {
                throttle: 100,
                scrollOffset: 200
            };
            i = e.extend(s, i);
            var u = [];
            t = e(t), t.each(function(t, n) {
                a.push(e(n)), e(n).data("scrollSpy:id", t), e('a[href="#' + e(n).attr("id") + '"]').click(function(t) {
                    t.preventDefault();
                    var n = e(this.hash).offset().top + 1;
                    e("html, body").animate({
                        scrollTop: n - i.scrollOffset
                    }, {
                        duration: 400,
                        queue: !1,
                        easing: "easeOutCubic"
                    })
                })
            }), c.top = i.offsetTop || 0, c.right = i.offsetRight || 0, c.bottom = i.offsetBottom || 0, c.left = i.offsetLeft || 0;
            var d = r(n, i.throttle || 100),
                f = function() {
                    e(document).ready(d)
                };
            return l || (o.on("scroll", f), o.on("resize", f), l = !0), setTimeout(f, 0), t.on("scrollSpy:enter", function() {
                u = e.grep(u, function(e) {
                    return 0 != e.height()
                });
                var t = e(this);
                u[0] ? (e('a[href="#' + u[0].attr("id") + '"]').removeClass("active"), t.data("scrollSpy:id") < u[0].data("scrollSpy:id") ? u.unshift(e(this)) : u.push(e(this))) : u.push(e(this)), e('a[href="#' + u[0].attr("id") + '"]').addClass("active")
            }), t.on("scrollSpy:exit", function() {
                if (u = e.grep(u, function(e) {
                        return 0 != e.height()
                    }), u[0]) {
                    e('a[href="#' + u[0].attr("id") + '"]').removeClass("active");
                    var t = e(this);
                    u = e.grep(u, function(e) {
                        return e.attr("id") != t.attr("id")
                    }), u[0] && e('a[href="#' + u[0].attr("id") + '"]').addClass("active")
                }
            }), t
        }, e.winSizeSpy = function(t) {
            return e.winSizeSpy = function() {
                return o
            }, t = t || {
                throttle: 100
            }, o.on("resize", r(i, t.throttle || 100))
        }, e.fn.scrollSpy = function(t) {
            return e.scrollSpy(e(this), t)
        }
    }(jQuery),
    function(e) {
        e(document).ready(function() {
            function t(t) {
                var n = t.css("font-family"),
                    i = t.css("font-size"),
                    o = t.css("line-height");
                i && r.css("font-size", i), n && r.css("font-family", n), o && r.css("line-height", o), "off" === t.attr("wrap") && r.css("overflow-wrap", "normal").css("white-space", "pre"), r.text(t.val() + "\n");
                var a = r.html().replace(/\n/g, "<br>");
                r.html(a), t.is(":visible") ? r.css("width", t.width()) : r.css("width", e(window).width() / 2), t.css("height", r.height())
            }
            Materialize.updateTextFields = function() {
                var t = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
                e(t).each(function(t, n) {
                    e(n).val().length > 0 || n.autofocus || void 0 !== e(this).attr("placeholder") || e(n)[0].validity.badInput === !0 ? e(this).siblings("label").addClass("active") : e(this).siblings("label").removeClass("active")
                })
            };
            var n = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
            e(document).on("change", n, function() {
                (0 !== e(this).val().length || void 0 !== e(this).attr("placeholder")) && e(this).siblings("label").addClass("active"), validate_field(e(this))
            }), e(document).ready(function() {
                Materialize.updateTextFields()
            }), e(document).on("reset", function(t) {
                var i = e(t.target);
                i.is("form") && (i.find(n).removeClass("valid").removeClass("invalid"), i.find(n).each(function() {
                    "" === e(this).attr("value") && e(this).siblings("label").removeClass("active")
                }), i.find("select.initialized").each(function() {
                    var e = i.find("option[selected]").text();
                    i.siblings("input.select-dropdown").val(e)
                }))
            }), e(document).on("focus", n, function() {
                e(this).siblings("label, .prefix").addClass("active")
            }), e(document).on("blur", n, function() {
                var t = e(this),
                    n = ".prefix";
                0 === t.val().length && t[0].validity.badInput !== !0 && void 0 === t.attr("placeholder") && (n += ", label"), t.siblings(n).removeClass("active"), validate_field(t)
            }), window.validate_field = function(e) {
                var t = void 0 !== e.attr("length"),
                    n = parseInt(e.attr("length")),
                    i = e.val().length;
                0 === e.val().length && e[0].validity.badInput === !1 ? e.hasClass("validate") && (e.removeClass("valid"), e.removeClass("invalid")) : e.hasClass("validate") && (e.is(":valid") && t && n >= i || e.is(":valid") && !t ? (e.removeClass("invalid"), e.addClass("valid")) : (e.removeClass("valid"), e.addClass("invalid")))
            };
            var i = "input[type=radio], input[type=checkbox]";
            e(document).on("keyup.radio", i, function(t) {
                if (9 === t.which) {
                    e(this).addClass("tabbed");
                    var n = e(this);
                    return void n.one("blur", function(t) {
                        e(this).removeClass("tabbed")
                    })
                }
            });
            var r = e(".hiddendiv").first();
            r.length || (r = e('<div class="hiddendiv common"></div>'), e("body").append(r));
            var o = ".materialize-textarea";
            e(o).each(function() {
                var n = e(this);
                n.val().length && t(n)
            }), e("body").on("keyup keydown autoresize", o, function() {
                t(e(this))
            }), e(document).on("change", '.file-field input[type="file"]', function() {
                for (var t = e(this).closest(".file-field"), n = t.find("input.file-path"), i = e(this)[0].files, r = [], o = 0; o < i.length; o++) r.push(i[o].name);
                n.val(r.join(", ")), n.trigger("change")
            });
            var a, s = "input[type=range]",
                l = !1;
            e(s).each(function() {
                var t = e('<span class="thumb"><span class="value"></span></span>');
                e(this).after(t)
            });
            var u = ".range-field";
            e(document).on("change", s, function(t) {
                var n = e(this).siblings(".thumb");
                n.find(".value").html(e(this).val())
            }), e(document).on("input mousedown touchstart", s, function(t) {
                var n = e(this).siblings(".thumb"),
                    i = e(this).outerWidth();
                n.length <= 0 && (n = e('<span class="thumb"><span class="value"></span></span>'), e(this).after(n)), n.find(".value").html(e(this).val()), l = !0, e(this).addClass("active"), n.hasClass("active") || n.velocity({
                    height: "30px",
                    width: "30px",
                    top: "-20px",
                    marginLeft: "-15px"
                }, {
                    duration: 300,
                    easing: "easeOutExpo"
                }), "input" !== t.type && (a = void 0 === t.pageX || null === t.pageX ? t.originalEvent.touches[0].pageX - e(this).offset().left : t.pageX - e(this).offset().left, 0 > a ? a = 0 : a > i && (a = i), n.addClass("active").css("left", a)), n.find(".value").html(e(this).val())
            }), e(document).on("mouseup touchend", u, function() {
                l = !1, e(this).removeClass("active")
            }), e(document).on("mousemove touchmove", u, function(t) {
                var n, i = e(this).children(".thumb");
                if (l) {
                    i.hasClass("active") || i.velocity({
                        height: "30px",
                        width: "30px",
                        top: "-20px",
                        marginLeft: "-15px"
                    }, {
                        duration: 300,
                        easing: "easeOutExpo"
                    }), n = void 0 === t.pageX || null === t.pageX ? t.originalEvent.touches[0].pageX - e(this).offset().left : t.pageX - e(this).offset().left;
                    var r = e(this).outerWidth();
                    0 > n ? n = 0 : n > r && (n = r), i.addClass("active").css("left", n), i.find(".value").html(i.siblings(s).val())
                }
            }), e(document).on("mouseout touchleave", u, function() {
                if (!l) {
                    var t = e(this).children(".thumb");
                    t.hasClass("active") && t.velocity({
                        height: "0",
                        width: "0",
                        top: "10px",
                        marginLeft: "-6px"
                    }, {
                        duration: 100
                    }), t.removeClass("active")
                }
            }), e.fn.autocomplete = function(t) {
                var n = {
                    data: {}
                };
                return t = e.extend(n, t), this.each(function() {
                    var n = e(this),
                        i = t.data,
                        r = n.closest(".input-field");
                    if (!e.isEmptyObject(i)) {
                        var o = e('<ul class="autocomplete-content dropdown-content"></ul>');
                        r.length ? r.append(o) : n.after(o);
                        var a = function(e, t) {
                            var n = t.find("img"),
                                i = t.text().toLowerCase().indexOf("" + e.toLowerCase()),
                                r = i + e.length - 1,
                                o = t.text().slice(0, i),
                                a = t.text().slice(i, r + 1),
                                s = t.text().slice(r + 1);
                            t.html("<span>" + o + "<span class='highlight'>" + a + "</span>" + s + "</span>"), n.length && t.prepend(n)
                        };
                        n.on("keyup", function(t) {
                            if (13 === t.which) return void o.find("li").first().click();
                            var r = n.val().toLowerCase();
                            if (o.empty(), "" !== r)
                                for (var s in i)
                                    if (i.hasOwnProperty(s) && -1 !== s.toLowerCase().indexOf(r) && s.toLowerCase() !== r) {
                                        var l = e("<li></li>");
                                        i[s] ? l.append('<img src="' + i[s] + '" class="right circle"><span>' + s + "</span>") : l.append("<span>" + s + "</span>"), o.append(l), a(r, l)
                                    }
                        }), o.on("click", "li", function() {
                            n.val(e(this).text().trim()), o.empty()
                        })
                    }
                })
            }
        }), e.fn.material_select = function(t) {
            function n(e, t, n) {
                var r = e.indexOf(t),
                    o = -1 === r;
                return o ? e.push(t) : e.splice(r, 1), n.siblings("ul.dropdown-content").find("li").eq(t).toggleClass("active"), n.find("option").eq(t).prop("selected", o), i(e, n), o
            }

            function i(e, t) {
                for (var n = "", i = 0, r = e.length; r > i; i++) {
                    var o = t.find("option").eq(e[i]).text();
                    n += 0 === i ? o : ", " + o
                }
                "" === n && (n = t.find("option:disabled").eq(0).text()), t.siblings("input.select-dropdown").val(n)
            }
            e(this).each(function() {
                var i = e(this);
                if (!i.hasClass("browser-default")) {
                    var r = !!i.attr("multiple"),
                        o = i.data("select-id");
                    if (o && (i.parent().find("span.caret").remove(), i.parent().find("input").remove(), i.unwrap(), e("ul#select-options-" + o).remove()), "destroy" === t) return void i.data("select-id", null).removeClass("initialized");
                    var a = Materialize.guid();
                    i.data("select-id", a);
                    var s = e('<div class="select-wrapper"></div>');
                    s.addClass(i.attr("class"));
                    var l = e('<ul id="select-options-' + a + '" class="dropdown-content select-dropdown ' + (r ? "multiple-select-dropdown" : "") + '"></ul>'),
                        u = i.children("option, optgroup"),
                        c = [],
                        d = !1,
                        f = i.find("option:selected").html() || i.find("option:first").html() || "",
                        p = function(t, n, i) {
                            var r = n.is(":disabled") ? "disabled " : "",
                                o = "optgroup-option" === i ? "optgroup-option " : "",
                                a = n.data("icon"),
                                s = n.attr("class");
                            if (a) {
                                var u = "";
                                return s && (u = ' class="' + s + '"'), "multiple" === i ? l.append(e('<li class="' + r + '"><img src="' + a + '"' + u + '><span><input type="checkbox"' + r + "/><label></label>" + n.html() + "</span></li>")) : l.append(e('<li class="' + r + o + '"><img src="' + a + '"' + u + "><span>" + n.html() + "</span></li>")), !0
                            }
                            "multiple" === i ? l.append(e('<li class="' + r + '"><span><input type="checkbox"' + r + "/><label></label>" + n.html() + "</span></li>")) : l.append(e('<li class="' + r + o + '"><span>' + n.html() + "</span></li>"))
                        };
                    u.length && u.each(function() {
                        if (e(this).is("option")) r ? p(i, e(this), "multiple") : p(i, e(this));
                        else if (e(this).is("optgroup")) {
                            var t = e(this).children("option");
                            l.append(e('<li class="optgroup"><span>' + e(this).attr("label") + "</span></li>")), t.each(function() {
                                p(i, e(this), "optgroup-option")
                            })
                        }
                    }), l.find("li:not(.optgroup)").each(function(o) {
                        e(this).click(function(a) {
                            if (!e(this).hasClass("disabled") && !e(this).hasClass("optgroup")) {
                                var s = !0;
                                r ? (e('input[type="checkbox"]', this).prop("checked", function(e, t) {
                                    return !t
                                }), s = n(c, e(this).index(), i), g.trigger("focus")) : (l.find("li").removeClass("active"), e(this).toggleClass("active"), g.val(e(this).text())), m(l, e(this)), i.find("option").eq(o).prop("selected", s), i.trigger("change"), "undefined" != typeof t && t()
                            }
                            a.stopPropagation()
                        })
                    }), i.wrap(s);
                    var h = e('<span class="caret">&#9660;</span>');
                    i.is(":disabled") && h.addClass("disabled");
                    var v = f.replace(/"/g, "&quot;"),
                        g = e('<input type="text" class="select-dropdown" readonly="true" ' + (i.is(":disabled") ? "disabled" : "") + ' data-activates="select-options-' + a + '" value="' + v + '"/>');
                    i.before(g), g.before(h), g.after(l), i.is(":disabled") || g.dropdown({
                        hover: !1,
                        closeOnClick: !1
                    }), i.attr("tabindex") && e(g[0]).attr("tabindex", i.attr("tabindex")), i.addClass("initialized"), g.on({
                        focus: function() {
                            if (e("ul.select-dropdown").not(l[0]).is(":visible") && e("input.select-dropdown").trigger("close"), !l.is(":visible")) {
                                e(this).trigger("open", ["focus"]);
                                var t = e(this).val(),
                                    n = l.find("li").filter(function() {
                                        return e(this).text().toLowerCase() === t.toLowerCase()
                                    })[0];
                                m(l, n)
                            }
                        },
                        click: function(e) {
                            e.stopPropagation()
                        }
                    }), g.on("blur", function() {
                        r || e(this).trigger("close"), l.find("li.selected").removeClass("selected")
                    }), l.hover(function() {
                        d = !0
                    }, function() {
                        d = !1
                    }), e(window).on({
                        click: function() {
                            r && (d || g.trigger("close"))
                        }
                    }), r && i.find("option:selected:not(:disabled)").each(function() {
                        var t = e(this).index();
                        n(c, t, i), l.find("li").eq(t).find(":checkbox").prop("checked", !0)
                    });
                    var m = function(t, n) {
                            if (n) {
                                t.find("li.selected").removeClass("selected");
                                var i = e(n);
                                i.addClass("selected"), l.scrollTo(i)
                            }
                        },
                        y = [],
                        b = function(t) {
                            if (9 == t.which) return void g.trigger("close");
                            if (40 == t.which && !l.is(":visible")) return void g.trigger("open");
                            if (13 != t.which || l.is(":visible")) {
                                t.preventDefault();
                                var n = String.fromCharCode(t.which).toLowerCase(),
                                    i = [9, 13, 27, 38, 40];
                                if (n && -1 === i.indexOf(t.which)) {
                                    y.push(n);
                                    var o = y.join(""),
                                        a = l.find("li").filter(function() {
                                            return 0 === e(this).text().toLowerCase().indexOf(o)
                                        })[0];
                                    a && m(l, a)
                                }
                                if (13 == t.which) {
                                    var s = l.find("li.selected:not(.disabled)")[0];
                                    s && (e(s).trigger("click"), r || g.trigger("close"))
                                }
                                40 == t.which && (a = l.find("li.selected").length ? l.find("li.selected").next("li:not(.disabled)")[0] : l.find("li:not(.disabled)")[0], m(l, a)), 27 == t.which && g.trigger("close"), 38 == t.which && (a = l.find("li.selected").prev("li:not(.disabled)")[0], a && m(l, a)), setTimeout(function() {
                                    y = []
                                }, 1e3)
                            }
                        };
                    g.on("keydown", b)
                }
            })
        }
    }(jQuery),
    function(e) {
        var t = {
            init: function(t) {
                var n = {
                    indicators: !0,
                    height: 400,
                    transition: 500,
                    interval: 6e3
                };
                return t = e.extend(n, t), this.each(function() {
                    function n(e, t) {
                        e.hasClass("center-align") ? e.velocity({
                            opacity: 0,
                            translateY: -100
                        }, {
                            duration: t,
                            queue: !1
                        }) : e.hasClass("right-align") ? e.velocity({
                            opacity: 0,
                            translateX: 100
                        }, {
                            duration: t,
                            queue: !1
                        }) : e.hasClass("left-align") && e.velocity({
                            opacity: 0,
                            translateX: -100
                        }, {
                            duration: t,
                            queue: !1
                        })
                    }

                    function i(e) {
                        e >= u.length ? e = 0 : 0 > e && (e = u.length - 1), c = l.find(".active").index(), c != e && (r = u.eq(c), $caption = r.find(".caption"), r.removeClass("active"), r.velocity({
                            opacity: 0
                        }, {
                            duration: t.transition,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                u.not(".active").velocity({
                                    opacity: 0,
                                    translateX: 0,
                                    translateY: 0
                                }, {
                                    duration: 0,
                                    queue: !1
                                })
                            }
                        }), n($caption, t.transition), t.indicators && o.eq(c).removeClass("active"), u.eq(e).velocity({
                            opacity: 1
                        }, {
                            duration: t.transition,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), u.eq(e).find(".caption").velocity({
                            opacity: 1,
                            translateX: 0,
                            translateY: 0
                        }, {
                            duration: t.transition,
                            delay: t.transition,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), u.eq(e).addClass("active"), t.indicators && o.eq(e).addClass("active"))
                    }
                    var r, o, a, s = e(this),
                        l = s.find("ul.slides").first(),
                        u = l.find("> li"),
                        c = l.find(".active").index(); - 1 != c && (r = u.eq(c)), s.hasClass("fullscreen") || (t.indicators ? s.height(t.height + 40) : s.height(t.height), l.height(t.height)), u.find(".caption").each(function() {
                        n(e(this), 0)
                    }), u.find("img").each(function() {
                        var t = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                        e(this).attr("src") !== t && (e(this).css("background-image", "url(" + e(this).attr("src") + ")"), e(this).attr("src", t))
                    }), t.indicators && (o = e('<ul class="indicators"></ul>'), u.each(function(n) {
                        var r = e('<li class="indicator-item"></li>');
                        r.click(function() {
                            var n = l.parent(),
                                r = n.find(e(this)).index();
                            i(r), clearInterval(a), a = setInterval(function() {
                                c = l.find(".active").index(), u.length == c + 1 ? c = 0 : c += 1, i(c)
                            }, t.transition + t.interval)
                        }), o.append(r)
                    }), s.append(o), o = s.find("ul.indicators").find("li.indicator-item")), r ? r.show() : (u.first().addClass("active").velocity({
                        opacity: 1
                    }, {
                        duration: t.transition,
                        queue: !1,
                        easing: "easeOutQuad"
                    }), c = 0, r = u.eq(c), t.indicators && o.eq(c).addClass("active")), r.find("img").each(function() {
                        r.find(".caption").velocity({
                            opacity: 1,
                            translateX: 0,
                            translateY: 0
                        }, {
                            duration: t.transition,
                            queue: !1,
                            easing: "easeOutQuad"
                        })
                    }), a = setInterval(function() {
                        c = l.find(".active").index(), i(c + 1)
                    }, t.transition + t.interval);
                    var d = !1,
                        f = !1,
                        p = !1;
                    s.hammer({
                        prevent_default: !1
                    }).bind("pan", function(e) {
                        if ("touch" === e.gesture.pointerType) {
                            clearInterval(a);
                            var t = e.gesture.direction,
                                n = e.gesture.deltaX,
                                i = e.gesture.velocityX;
                            $curr_slide = l.find(".active"), $curr_slide.velocity({
                                translateX: n
                            }, {
                                duration: 50,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), 4 === t && (n > s.innerWidth() / 2 || -.65 > i) ? p = !0 : 2 === t && (n < -1 * s.innerWidth() / 2 || i > .65) && (f = !0);
                            var r;
                            f && (r = $curr_slide.next(), 0 === r.length && (r = u.first()), r.velocity({
                                opacity: 1
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            })), p && (r = $curr_slide.prev(), 0 === r.length && (r = u.last()), r.velocity({
                                opacity: 1
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }))
                        }
                    }).bind("panend", function(e) {
                        "touch" === e.gesture.pointerType && ($curr_slide = l.find(".active"), d = !1, curr_index = l.find(".active").index(), !p && !f || u.length <= 1 ? $curr_slide.velocity({
                            translateX: 0
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }) : f ? (i(curr_index + 1), $curr_slide.velocity({
                            translateX: -1 * s.innerWidth()
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                $curr_slide.velocity({
                                    opacity: 0,
                                    translateX: 0
                                }, {
                                    duration: 0,
                                    queue: !1
                                })
                            }
                        })) : p && (i(curr_index - 1), $curr_slide.velocity({
                            translateX: s.innerWidth()
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                $curr_slide.velocity({
                                    opacity: 0,
                                    translateX: 0
                                }, {
                                    duration: 0,
                                    queue: !1
                                })
                            }
                        })), f = !1, p = !1, clearInterval(a), a = setInterval(function() {
                            c = l.find(".active").index(), u.length == c + 1 ? c = 0 : c += 1, i(c)
                        }, t.transition + t.interval))
                    }), s.on("sliderPause", function() {
                        clearInterval(a)
                    }), s.on("sliderStart", function() {
                        clearInterval(a), a = setInterval(function() {
                            c = l.find(".active").index(), u.length == c + 1 ? c = 0 : c += 1, i(c)
                        }, t.transition + t.interval)
                    }), s.on("sliderNext", function() {
                        c = l.find(".active").index(), i(c + 1)
                    }), s.on("sliderPrev", function() {
                        c = l.find(".active").index(), i(c - 1)
                    })
                })
            },
            pause: function() {
                e(this).trigger("sliderPause")
            },
            start: function() {
                e(this).trigger("sliderStart")
            },
            next: function() {
                e(this).trigger("sliderNext")
            },
            prev: function() {
                e(this).trigger("sliderPrev")
            }
        };
        e.fn.slider = function(n) {
            return t[n] ? t[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void e.error("Method " + n + " does not exist on jQuery.tooltip") : t.init.apply(this, arguments)
        }
    }(jQuery),
    function(e) {
        e(document).ready(function() {
            e(document).on("click.card", ".card", function(t) {
                e(this).find("> .card-reveal").length && (e(t.target).is(e(".card-reveal .card-title")) || e(t.target).is(e(".card-reveal .card-title i")) ? e(this).find(".card-reveal").velocity({
                    translateY: 0
                }, {
                    duration: 225,
                    queue: !1,
                    easing: "easeInOutQuad",
                    complete: function() {
                        e(this).css({
                            display: "none"
                        })
                    }
                }) : (e(t.target).is(e(".card .activator")) || e(t.target).is(e(".card .activator i"))) && (e(t.target).closest(".card").css("overflow", "hidden"), e(this).find(".card-reveal").css({
                    display: "block"
                }).velocity("stop", !1).velocity({
                    translateY: "-100%"
                }, {
                    duration: 300,
                    queue: !1,
                    easing: "easeInOutQuad"
                })))
            })
        })
    }(jQuery),
    function(e) {
        var t = !1,
            n = {
                data: [],
                placeholder: "",
                secondaryPlaceholder: ""
            };
        e(document).ready(function() {
            e(document).on("click", ".chip .close", function(t) {
                var n = e(this).closest(".chips");
                n.data("initialized") || e(this).closest(".chip").remove()
            })
        }), e.fn.material_chip = function(i) {
            var r = this;
            return this.$el = e(this), this.$document = e(document), this.SELS = {
                CHIPS: ".chips",
                CHIP: ".chip",
                INPUT: "input",
                DELETE: ".material-icons",
                SELECTED_CHIP: ".selected"
            }, "data" === i ? this.$el.data("chips") : "options" === i ? this.$el.data("options") : (this.$el.data("options", e.extend({}, n, i)), this.init = function() {
                var t = 0;
                r.$el.each(function() {
                    var n = e(this);
                    if (!n.data("initialized")) {
                        var i = n.data("options");
                        (!i.data || !i.data instanceof Array) && (i.data = []), n.data("chips", i.data), n.data("index", t), n.data("initialized", !0), n.hasClass(r.SELS.CHIPS) || n.addClass("chips"), r.chips(n), t++
                    }
                })
            }, this.handleEvents = function() {
                var t = r.SELS;
                r.$document.on("click", t.CHIPS, function(n) {
                    e(n.target).find(t.INPUT).focus()
                }), r.$document.on("click", t.CHIP, function(n) {
                    e(t.CHIP).removeClass("selected"), e(this).toggleClass("selected")
                }), r.$document.on("keydown", function(n) {
                    if (!e(n.target).is("input, textarea")) {
                        var i, o = r.$document.find(t.CHIP + t.SELECTED_CHIP),
                            a = o.closest(t.CHIPS),
                            s = o.siblings(t.CHIP).length;
                        if (o.length)
                            if (8 === n.which || 46 === n.which) {
                                n.preventDefault();
                                var l = a.data("index");
                                i = o.index(), r.deleteChip(l, i, a);
                                var u = null;
                                s > i + 1 ? u = i : (i === s || i + 1 === s) && (u = s - 1), 0 > u && (u = null), null !== u && r.selectChip(l, u, a), s || a.find("input").focus()
                            } else if (37 === n.which) {
                            if (i = o.index() - 1, 0 > i) return;
                            e(t.CHIP).removeClass("selected"), r.selectChip(a.data("index"), i, a)
                        } else if (39 === n.which) {
                            if (i = o.index() + 1, e(t.CHIP).removeClass("selected"), i > s) return void a.find("input").focus();
                            r.selectChip(a.data("index"), i, a)
                        }
                    }
                }), r.$document.on("focusin", t.CHIPS + " " + t.INPUT, function(n) {
                    e(n.target).closest(t.CHIPS).addClass("focus"), e(t.CHIP).removeClass("selected")
                }), r.$document.on("focusout", t.CHIPS + " " + t.INPUT, function(n) {
                    e(n.target).closest(t.CHIPS).removeClass("focus")
                }), r.$document.on("keydown", t.CHIPS + " " + t.INPUT, function(n) {
                    var i = e(n.target),
                        o = i.closest(t.CHIPS),
                        a = o.data("index"),
                        s = o.children(t.CHIP).length;
                    return 13 === n.which ? (n.preventDefault(), r.addChip(a, {
                        tag: i.val()
                    }, o), void i.val("")) : 8 !== n.keyCode && 37 !== n.keyCode || "" !== i.val() || !s ? void 0 : (r.selectChip(a, s - 1, o), void i.blur())
                }), r.$document.on("click", t.CHIPS + " " + t.DELETE, function(n) {
                    var i = e(n.target),
                        o = i.closest(t.CHIPS),
                        a = i.closest(t.CHIP);
                    n.stopPropagation(), r.deleteChip(o.data("index"), a.index(), o), o.find("input").focus()
                })
            }, this.chips = function(e) {
                var t = "";
                e.data("options"), e.data("chips").forEach(function(e) {
                    t += r.renderChip(e)
                }), t += '<input class="input" placeholder="">', e.html(t), r.setPlaceholder(e)
            }, this.renderChip = function(e) {
                if (e.tag) {
                    var t = '<div class="chip">' + e.tag;
                    return e.image && (t += ' <img src="' + e.image + '"> '), t += '<i class="material-icons close">close</i>', t += "</div>"
                }
            }, this.setPlaceholder = function(e) {
                var t = e.data("options");
                e.data("chips").length && t.placeholder ? e.find("input").prop("placeholder", t.placeholder) : !e.data("chips").length && t.secondaryPlaceholder && e.find("input").prop("placeholder", t.secondaryPlaceholder)
            }, this.isValid = function(e, t) {
                for (var n = e.data("chips"), i = !1, r = 0; r < n.length; r++)
                    if (n[r].tag === t.tag) return void(i = !0);
                return "" !== t.tag && !i
            }, this.addChip = function(t, n, i) {
                if (r.isValid(i, n)) {
                    var o = (i.data("options"), r.renderChip(n));
                    i.data("chips").push(n), e(o).insertBefore(i.find("input")), i.trigger("chip.add", n), r.setPlaceholder(i)
                }
            }, this.deleteChip = function(e, t, n) {
                var i = n.data("chips")[t];
                n.find(".chip").eq(t).remove(), n.data("chips").splice(t, 1), n.trigger("chip.delete", i), r.setPlaceholder(n)
            }, this.selectChip = function(e, t, n) {
                var i = n.find(".chip").eq(t);
                i && !1 === i.hasClass("selected") && (i.addClass("selected"), n.trigger("chip.select", n.data("chips")[t]))
            }, this.getChipsElement = function(e, t) {
                return t.eq(e)
            }, this.init(), void(t || (this.handleEvents(), t = !0)))
        }
    }(jQuery),
    function(e) {
        e.fn.pushpin = function(t) {
            var n = {
                top: 0,
                bottom: 1 / 0,
                offset: 0
            };
            return "remove" === t ? (this.each(function() {
                (id = e(this).data("pushpin-id")) && (e(window).off("scroll." + id), e(this).removeData("pushpin-id").removeClass("pin-top pinned pin-bottom").removeAttr("style"))
            }), !1) : (t = e.extend(n, t), $index = 0, this.each(function() {
                function n(e) {
                    e.removeClass("pin-top"), e.removeClass("pinned"), e.removeClass("pin-bottom")
                }

                function i(i, r) {
                    i.each(function() {
                        t.top <= r && t.bottom >= r && !e(this).hasClass("pinned") && (n(e(this)), e(this).css("top", t.offset), e(this).addClass("pinned")), r < t.top && !e(this).hasClass("pin-top") && (n(e(this)), e(this).css("top", 0), e(this).addClass("pin-top")), r > t.bottom && !e(this).hasClass("pin-bottom") && (n(e(this)), e(this).addClass("pin-bottom"), e(this).css("top", t.bottom - a))
                    })
                }
                var r = Materialize.guid(),
                    o = e(this),
                    a = e(this).offset().top;
                e(this).data("pushpin-id", r), i(o, e(window).scrollTop()), e(window).on("scroll." + r, function() {
                    var n = e(window).scrollTop() + t.offset;
                    i(o, n)
                })
            }))
        }
    }(jQuery),
    function(e) {
        e(document).ready(function() {
            e.fn.reverse = [].reverse, e(document).on("mouseenter.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function(n) {
                var i = e(this);
                t(i)
            }), e(document).on("mouseleave.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function(t) {
                var i = e(this);
                n(i)
            }), e(document).on("click.fixedActionBtn", ".fixed-action-btn.click-to-toggle > a", function(i) {
                var r = e(this),
                    o = r.parent();
                o.hasClass("active") ? n(o) : t(o)
            })
        }), e.fn.extend({
            openFAB: function() {
                t(e(this))
            },
            closeFAB: function() {
                n(e(this))
            }
        });
        var t = function(t) {
                if ($this = t, $this.hasClass("active") === !1) {
                    var n, i, r = $this.hasClass("horizontal");
                    r === !0 ? i = 40 : n = 40, $this.addClass("active"), $this.find("ul .btn-floating").velocity({
                        scaleY: ".4",
                        scaleX: ".4",
                        translateY: n + "px",
                        translateX: i + "px"
                    }, {
                        duration: 0
                    });
                    var o = 0;
                    $this.find("ul .btn-floating").reverse().each(function() {
                        e(this).velocity({
                            opacity: "1",
                            scaleX: "1",
                            scaleY: "1",
                            translateY: "0",
                            translateX: "0"
                        }, {
                            duration: 80,
                            delay: o
                        }), o += 40
                    })
                }
            },
            n = function(e) {
                $this = e;
                var t, n, i = $this.hasClass("horizontal");
                i === !0 ? n = 40 : t = 40, $this.removeClass("active"), $this.find("ul .btn-floating").velocity("stop", !0), $this.find("ul .btn-floating").velocity({
                    opacity: "0",
                    scaleX: ".4",
                    scaleY: ".4",
                    translateY: t + "px",
                    translateX: n + "px"
                }, {
                    duration: 80
                })
            }
    }(jQuery),
    function(e) {
        Materialize.fadeInImage = function(t) {
            var n;
            if ("string" == typeof t) n = e(t);
            else {
                if ("object" != typeof t) return;
                n = t
            }
            n.css({
                opacity: 0
            }), e(n).velocity({
                opacity: 1
            }, {
                duration: 650,
                queue: !1,
                easing: "easeOutSine"
            }), e(n).velocity({
                opacity: 1
            }, {
                duration: 1300,
                queue: !1,
                easing: "swing",
                step: function(t, n) {
                    n.start = 100;
                    var i = t / 100,
                        r = 150 - (100 - t) / 1.75;
                    100 > r && (r = 100), t >= 0 && e(this).css({
                        "-webkit-filter": "grayscale(" + i + ")brightness(" + r + "%)",
                        filter: "grayscale(" + i + ")brightness(" + r + "%)"
                    })
                }
            })
        }, Materialize.showStaggeredList = function(t) {
            var n;
            if ("string" == typeof t) n = e(t);
            else {
                if ("object" != typeof t) return;
                n = t
            }
            var i = 0;
            n.find("li").velocity({
                translateX: "-100px"
            }, {
                duration: 0
            }), n.find("li").each(function() {
                e(this).velocity({
                    opacity: "1",
                    translateX: "0"
                }, {
                    duration: 800,
                    delay: i,
                    easing: [60, 10]
                }), i += 120
            })
        }, e(document).ready(function() {
            var t = !1,
                n = !1;
            e(".dismissable").each(function() {
                e(this).hammer({
                    prevent_default: !1
                }).bind("pan", function(i) {
                    if ("touch" === i.gesture.pointerType) {
                        var r = e(this),
                            o = i.gesture.direction,
                            a = i.gesture.deltaX,
                            s = i.gesture.velocityX;
                        r.velocity({
                            translateX: a
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), 4 === o && (a > r.innerWidth() / 2 || -.75 > s) && (t = !0), 2 === o && (a < -1 * r.innerWidth() / 2 || s > .75) && (n = !0)
                    }
                }).bind("panend", function(i) {
                    if (Math.abs(i.gesture.deltaX) < e(this).innerWidth() / 2 && (n = !1, t = !1), "touch" === i.gesture.pointerType) {
                        var r = e(this);
                        if (t || n) {
                            var o;
                            o = t ? r.innerWidth() : -1 * r.innerWidth(), r.velocity({
                                translateX: o
                            }, {
                                duration: 100,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function() {
                                    r.css("border", "none"), r.velocity({
                                        height: 0,
                                        padding: 0
                                    }, {
                                        duration: 200,
                                        queue: !1,
                                        easing: "easeOutQuad",
                                        complete: function() {
                                            r.remove()
                                        }
                                    })
                                }
                            })
                        } else r.velocity({
                            translateX: 0
                        }, {
                            duration: 100,
                            queue: !1,
                            easing: "easeOutQuad"
                        });
                        t = !1, n = !1
                    }
                })
            })
        })
    }(jQuery),
    function(e) {
        Materialize.scrollFire = function(e) {
            var t = !1;
            window.addEventListener("scroll", function() {
                t = !0
            }), setInterval(function() {
                if (t) {
                    t = !1;
                    for (var n = window.pageYOffset + window.innerHeight, i = 0; i < e.length; i++) {
                        var r = e[i],
                            o = r.selector,
                            a = r.offset,
                            s = r.callback,
                            l = document.querySelector(o);
                        if (null !== l) {
                            var u = l.getBoundingClientRect().top + window.pageYOffset;
                            if (n > u + a && r.done !== !0) {
                                if ("function" == typeof s) s.call(this, l);
                                else if ("string" == typeof s) {
                                    var c = new Function(s);
                                    c(l)
                                }
                                r.done = !0
                            }
                        }
                    }
                }
            }, 100)
        }
    }(jQuery),
    function(e) {
        "function" == typeof define && define.amd ? define("picker", ["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : this.Picker = e(jQuery)
    }(function(e) {
        function t(o, a, l, d) {
            function f() {
                return t._.node("div", t._.node("div", t._.node("div", t._.node("div", k.component.nodes(b.open), w.box), w.wrap), w.frame), w.holder)
            }

            function p() {
                C.data(a, k).addClass(w.input).attr("tabindex", -1).val(C.data("value") ? k.get("select", x.format) : o.value), x.editable || C.on("focus." + b.id + " click." + b.id, function(e) {
                    e.preventDefault(), k.$root.eq(0).focus()
                }).on("keydown." + b.id, g), r(o, {
                    haspopup: !0,
                    expanded: !1,
                    readonly: !1,
                    owns: o.id + "_root"
                })
            }

            function h() {
                k.$root.on({
                    keydown: g,
                    focusin: function(e) {
                        k.$root.removeClass(w.focused), e.stopPropagation()
                    },
                    "mousedown click": function(t) {
                        var n = t.target;
                        n != k.$root.children()[0] && (t.stopPropagation(), "mousedown" != t.type || e(n).is("input, select, textarea, button, option") || (t.preventDefault(), k.$root.eq(0).focus()))
                    }
                }).on({
                    focus: function() {
                        C.addClass(w.target)
                    },
                    blur: function() {
                        C.removeClass(w.target)
                    }
                }).on("focus.toOpen", m).on("click", "[data-pick], [data-nav], [data-clear], [data-close]", function() {
                    var t = e(this),
                        n = t.data(),
                        i = t.hasClass(w.navDisabled) || t.hasClass(w.disabled),
                        r = s();
                    r = r && (r.type || r.href), (i || r && !e.contains(k.$root[0], r)) && k.$root.eq(0).focus(), !i && n.nav ? k.set("highlight", k.component.item.highlight, {
                        nav: n.nav
                    }) : !i && "pick" in n ? k.set("select", n.pick) : n.clear ? k.clear().close(!0) : n.close && k.close(!0)
                }), r(k.$root[0], "hidden", !0)
            }

            function v() {
                var t;
                x.hiddenName === !0 ? (t = o.name, o.name = "") : (t = ["string" == typeof x.hiddenPrefix ? x.hiddenPrefix : "", "string" == typeof x.hiddenSuffix ? x.hiddenSuffix : "_submit"], t = t[0] + o.name + t[1]), k._hidden = e('<input type=hidden name="' + t + '"' + (C.data("value") || o.value ? ' value="' + k.get("select", x.formatSubmit) + '"' : "") + ">")[0], C.on("change." + b.id, function() {
                    k._hidden.value = o.value ? k.get("select", x.formatSubmit) : ""
                }), x.container ? e(x.container).append(k._hidden) : C.after(k._hidden)
            }

            function g(e) {
                var t = e.keyCode,
                    n = /^(8|46)$/.test(t);
                return 27 == t ? (k.close(), !1) : void((32 == t || n || !b.open && k.component.key[t]) && (e.preventDefault(), e.stopPropagation(), n ? k.clear().close() : k.open()))
            }

            function m(e) {
                e.stopPropagation(), "focus" == e.type && k.$root.addClass(w.focused), k.open()
            }
            if (!o) return t;
            var y = !1,
                b = {
                    id: o.id || "P" + Math.abs(~~(Math.random() * new Date))
                },
                x = l ? e.extend(!0, {}, l.defaults, d) : d || {},
                w = e.extend({}, t.klasses(), x.klass),
                C = e(o),
                T = function() {
                    return this.start()
                },
                k = T.prototype = {
                    constructor: T,
                    $node: C,
                    start: function() {
                        return b && b.start ? k : (b.methods = {}, b.start = !0, b.open = !1, b.type = o.type, o.autofocus = o == s(), o.readOnly = !x.editable, o.id = o.id || b.id, "text" != o.type && (o.type = "text"), k.component = new l(k, x), k.$root = e(t._.node("div", f(), w.picker, 'id="' + o.id + '_root" tabindex="0"')), h(), x.formatSubmit && v(), p(), x.container ? e(x.container).append(k.$root) : C.after(k.$root), k.on({
                            start: k.component.onStart,
                            render: k.component.onRender,
                            stop: k.component.onStop,
                            open: k.component.onOpen,
                            close: k.component.onClose,
                            set: k.component.onSet
                        }).on({
                            start: x.onStart,
                            render: x.onRender,
                            stop: x.onStop,
                            open: x.onOpen,
                            close: x.onClose,
                            set: x.onSet
                        }), y = n(k.$root.children()[0]), o.autofocus && k.open(), k.trigger("start").trigger("render"))
                    },
                    render: function(e) {
                        return e ? k.$root.html(f()) : k.$root.find("." + w.box).html(k.component.nodes(b.open)), k.trigger("render")
                    },
                    stop: function() {
                        return b.start ? (k.close(), k._hidden && k._hidden.parentNode.removeChild(k._hidden), k.$root.remove(), C.removeClass(w.input).removeData(a), setTimeout(function() {
                            C.off("." + b.id)
                        }, 0), o.type = b.type, o.readOnly = !1, k.trigger("stop"), b.methods = {}, b.start = !1, k) : k
                    },
                    open: function(n) {
                        return b.open ? k : (C.addClass(w.active), r(o, "expanded", !0), setTimeout(function() {
                            k.$root.addClass(w.opened), r(k.$root[0], "hidden", !1)
                        }, 0), n !== !1 && (b.open = !0, y && c.css("overflow", "hidden").css("padding-right", "+=" + i()), k.$root.eq(0).focus(), u.on("click." + b.id + " focusin." + b.id, function(e) {
                            var t = e.target;
                            t != o && t != document && 3 != e.which && k.close(t === k.$root.children()[0])
                        }).on("keydown." + b.id, function(n) {
                            var i = n.keyCode,
                                r = k.component.key[i],
                                o = n.target;
                            27 == i ? k.close(!0) : o != k.$root[0] || !r && 13 != i ? e.contains(k.$root[0], o) && 13 == i && (n.preventDefault(), o.click()) : (n.preventDefault(), r ? t._.trigger(k.component.key.go, k, [t._.trigger(r)]) : k.$root.find("." + w.highlighted).hasClass(w.disabled) || k.set("select", k.component.item.highlight).close())
                        })), k.trigger("open"))
                    },
                    close: function(e) {
                        return e && (k.$root.off("focus.toOpen").eq(0).focus(), setTimeout(function() {
                            k.$root.on("focus.toOpen", m)
                        }, 0)), C.removeClass(w.active), r(o, "expanded", !1), setTimeout(function() {
                            k.$root.removeClass(w.opened + " " + w.focused), r(k.$root[0], "hidden", !0)
                        }, 0), b.open ? (b.open = !1, y && c.css("overflow", "").css("padding-right", "-=" + i()), u.off("." + b.id), k.trigger("close")) : k
                    },
                    clear: function(e) {
                        return k.set("clear", null, e)
                    },
                    set: function(t, n, i) {
                        var r, o, a = e.isPlainObject(t),
                            s = a ? t : {};
                        if (i = a && e.isPlainObject(n) ? n : i || {}, t) {
                            a || (s[t] = n);
                            for (r in s) o = s[r], r in k.component.item && (void 0 === o && (o = null), k.component.set(r, o, i)), ("select" == r || "clear" == r) && C.val("clear" == r ? "" : k.get(r, x.format)).trigger("change");
                            k.render()
                        }
                        return i.muted ? k : k.trigger("set", s)
                    },
                    get: function(e, n) {
                        if (e = e || "value", null != b[e]) return b[e];
                        if ("valueSubmit" == e) {
                            if (k._hidden) return k._hidden.value;
                            e = "value"
                        }
                        if ("value" == e) return o.value;
                        if (e in k.component.item) {
                            if ("string" == typeof n) {
                                var i = k.component.get(e);
                                return i ? t._.trigger(k.component.formats.toString, k.component, [n, i]) : ""
                            }
                            return k.component.get(e)
                        }
                    },
                    on: function(t, n, i) {
                        var r, o, a = e.isPlainObject(t),
                            s = a ? t : {};
                        if (t) {
                            a || (s[t] = n);
                            for (r in s) o = s[r], i && (r = "_" + r), b.methods[r] = b.methods[r] || [], b.methods[r].push(o)
                        }
                        return k
                    },
                    off: function() {
                        var e, t, n = arguments;
                        for (e = 0, namesCount = n.length; e < namesCount; e += 1) t = n[e], t in b.methods && delete b.methods[t];
                        return k
                    },
                    trigger: function(e, n) {
                        var i = function(e) {
                            var i = b.methods[e];
                            i && i.map(function(e) {
                                t._.trigger(e, k, [n])
                            })
                        };
                        return i("_" + e), i(e), k
                    }
                };
            return new T
        }

        function n(e) {
            var t, n = "position";
            return e.currentStyle ? t = e.currentStyle[n] : window.getComputedStyle && (t = getComputedStyle(e)[n]), "fixed" == t
        }

        function i() {
            if (c.height() <= l.height()) return 0;
            var t = e('<div style="visibility:hidden;width:100px" />').appendTo("body"),
                n = t[0].offsetWidth;
            t.css("overflow", "scroll");
            var i = e('<div style="width:100%" />').appendTo(t),
                r = i[0].offsetWidth;
            return t.remove(), n - r
        }

        function r(t, n, i) {
            if (e.isPlainObject(n))
                for (var r in n) o(t, r, n[r]);
            else o(t, n, i)
        }

        function o(e, t, n) {
            e.setAttribute(("role" == t ? "" : "aria-") + t, n)
        }

        function a(t, n) {
            e.isPlainObject(t) || (t = {
                attribute: n
            }), n = "";
            for (var i in t) {
                var r = ("role" == i ? "" : "aria-") + i,
                    o = t[i];
                n += null == o ? "" : r + '="' + t[i] + '"'
            }
            return n
        }

        function s() {
            try {
                return document.activeElement
            } catch (e) {}
        }
        var l = e(window),
            u = e(document),
            c = e(document.documentElement);
        return t.klasses = function(e) {
            return e = e || "picker", {
                picker: e,
                opened: e + "--opened",
                focused: e + "--focused",
                input: e + "__input",
                active: e + "__input--active",
                target: e + "__input--target",
                holder: e + "__holder",
                frame: e + "__frame",
                wrap: e + "__wrap",
                box: e + "__box"
            }
        }, t._ = {
            group: function(e) {
                for (var n, i = "", r = t._.trigger(e.min, e); r <= t._.trigger(e.max, e, [r]); r += e.i) n = t._.trigger(e.item, e, [r]), i += t._.node(e.node, n[0], n[1], n[2]);
                return i
            },
            node: function(t, n, i, r) {
                return n ? (n = e.isArray(n) ? n.join("") : n, i = i ? ' class="' + i + '"' : "", r = r ? " " + r : "", "<" + t + i + r + ">" + n + "</" + t + ">") : ""
            },
            lead: function(e) {
                return (10 > e ? "0" : "") + e
            },
            trigger: function(e, t, n) {
                return "function" == typeof e ? e.apply(t, n || []) : e
            },
            digits: function(e) {
                return /\d/.test(e[1]) ? 2 : 1
            },
            isDate: function(e) {
                return {}.toString.call(e).indexOf("Date") > -1 && this.isInteger(e.getDate())
            },
            isInteger: function(e) {
                return {}.toString.call(e).indexOf("Number") > -1 && e % 1 === 0
            },
            ariaAttr: a
        }, t.extend = function(n, i) {
            e.fn[n] = function(r, o) {
                var a = this.data(n);
                return "picker" == r ? a : a && "string" == typeof r ? t._.trigger(a[r], a, [o]) : this.each(function() {
                    var o = e(this);
                    o.data(n) || new t(this, n, i, r)
                })
            }, e.fn[n].defaults = i.defaults
        }, t
    }),
    function(e) {
        "function" == typeof define && define.amd ? define(["picker", "jquery"], e) : "object" == typeof exports ? module.exports = e(require("./picker.js"), require("jquery")) : e(Picker, jQuery)
    }(function(e, t) {
        function n(e, t) {
            var n = this,
                i = e.$node[0],
                r = i.value,
                o = e.$node.data("value"),
                a = o || r,
                s = o ? t.formatSubmit : t.format,
                l = function() {
                    return i.currentStyle ? "rtl" == i.currentStyle.direction : "rtl" == getComputedStyle(e.$root[0]).direction
                };
            n.settings = t, n.$node = e.$node, n.queue = {
                min: "measure create",
                max: "measure create",
                now: "now create",
                select: "parse create validate",
                highlight: "parse navigate create validate",
                view: "parse create validate viewset",
                disable: "deactivate",
                enable: "activate"
            }, n.item = {}, n.item.clear = null, n.item.disable = (t.disable || []).slice(0), n.item.enable = - function(e) {
                return e[0] === !0 ? e.shift() : -1
            }(n.item.disable), n.set("min", t.min).set("max", t.max).set("now"), a ? n.set("select", a, {
                format: s
            }) : n.set("select", null).set("highlight", n.item.now), n.key = {
                40: 7,
                38: -7,
                39: function() {
                    return l() ? -1 : 1
                },
                37: function() {
                    return l() ? 1 : -1
                },
                go: function(e) {
                    var t = n.item.highlight,
                        i = new Date(t.year, t.month, t.date + e);
                    n.set("highlight", i, {
                        interval: e
                    }), this.render()
                }
            }, e.on("render", function() {
                e.$root.find("." + t.klass.selectMonth).on("change", function() {
                    var n = this.value;
                    n && (e.set("highlight", [e.get("view").year, n, e.get("highlight").date]), e.$root.find("." + t.klass.selectMonth).trigger("focus"))
                }), e.$root.find("." + t.klass.selectYear).on("change", function() {
                    var n = this.value;
                    n && (e.set("highlight", [n, e.get("view").month, e.get("highlight").date]), e.$root.find("." + t.klass.selectYear).trigger("focus"))
                })
            }, 1).on("open", function() {
                var i = "";
                n.disabled(n.get("now")) && (i = ":not(." + t.klass.buttonToday + ")"), e.$root.find("button" + i + ", select").attr("disabled", !1)
            }, 1).on("close", function() {
                e.$root.find("button, select").attr("disabled", !0)
            }, 1)
        }
        var i = 7,
            r = 6,
            o = e._;
        n.prototype.set = function(e, t, n) {
            var i = this,
                r = i.item;
            return null === t ? ("clear" == e && (e = "select"), r[e] = t, i) : (r["enable" == e ? "disable" : "flip" == e ? "enable" : e] = i.queue[e].split(" ").map(function(r) {
                return t = i[r](e, t, n)
            }).pop(), "select" == e ? i.set("highlight", r.select, n) : "highlight" == e ? i.set("view", r.highlight, n) : e.match(/^(flip|min|max|disable|enable)$/) && (r.select && i.disabled(r.select) && i.set("select", r.select, n), r.highlight && i.disabled(r.highlight) && i.set("highlight", r.highlight, n)), i)
        }, n.prototype.get = function(e) {
            return this.item[e]
        }, n.prototype.create = function(e, n, i) {
            var r, a = this;
            return n = void 0 === n ? e : n, n == -(1 / 0) || n == 1 / 0 ? r = n : t.isPlainObject(n) && o.isInteger(n.pick) ? n = n.obj : t.isArray(n) ? (n = new Date(n[0], n[1], n[2]), n = o.isDate(n) ? n : a.create().obj) : n = o.isInteger(n) || o.isDate(n) ? a.normalize(new Date(n), i) : a.now(e, n, i), {
                year: r || n.getFullYear(),
                month: r || n.getMonth(),
                date: r || n.getDate(),
                day: r || n.getDay(),
                obj: r || n,
                pick: r || n.getTime()
            }
        }, n.prototype.createRange = function(e, n) {
            var i = this,
                r = function(e) {
                    return e === !0 || t.isArray(e) || o.isDate(e) ? i.create(e) : e
                };
            return o.isInteger(e) || (e = r(e)), o.isInteger(n) || (n = r(n)), o.isInteger(e) && t.isPlainObject(n) ? e = [n.year, n.month, n.date + e] : o.isInteger(n) && t.isPlainObject(e) && (n = [e.year, e.month, e.date + n]), {
                from: r(e),
                to: r(n)
            }
        }, n.prototype.withinRange = function(e, t) {
            return e = this.createRange(e.from, e.to), t.pick >= e.from.pick && t.pick <= e.to.pick
        }, n.prototype.overlapRanges = function(e, t) {
            var n = this;
            return e = n.createRange(e.from, e.to), t = n.createRange(t.from, t.to), n.withinRange(e, t.from) || n.withinRange(e, t.to) || n.withinRange(t, e.from) || n.withinRange(t, e.to)
        }, n.prototype.now = function(e, t, n) {
            return t = new Date, n && n.rel && t.setDate(t.getDate() + n.rel), this.normalize(t, n)
        }, n.prototype.navigate = function(e, n, i) {
            var r, o, a, s, l = t.isArray(n),
                u = t.isPlainObject(n),
                c = this.item.view;
            if (l || u) {
                for (u ? (o = n.year, a = n.month, s = n.date) : (o = +n[0], a = +n[1], s = +n[2]), i && i.nav && c && c.month !== a && (o = c.year, a = c.month), r = new Date(o, a + (i && i.nav ? i.nav : 0), 1), o = r.getFullYear(), a = r.getMonth(); new Date(o, a, s).getMonth() !== a;) s -= 1;
                n = [o, a, s]
            }
            return n
        }, n.prototype.normalize = function(e) {
            return e.setHours(0, 0, 0, 0), e
        }, n.prototype.measure = function(e, t) {
            var n = this;
            return t ? "string" == typeof t ? t = n.parse(e, t) : o.isInteger(t) && (t = n.now(e, t, {
                rel: t
            })) : t = "min" == e ? -(1 / 0) : 1 / 0, t
        }, n.prototype.viewset = function(e, t) {
            return this.create([t.year, t.month, 1])
        }, n.prototype.validate = function(e, n, i) {
            var r, a, s, l, u = this,
                c = n,
                d = i && i.interval ? i.interval : 1,
                f = -1 === u.item.enable,
                p = u.item.min,
                h = u.item.max,
                v = f && u.item.disable.filter(function(e) {
                    if (t.isArray(e)) {
                        var i = u.create(e).pick;
                        i < n.pick ? r = !0 : i > n.pick && (a = !0)
                    }
                    return o.isInteger(e)
                }).length;
            if ((!i || !i.nav) && (!f && u.disabled(n) || f && u.disabled(n) && (v || r || a) || !f && (n.pick <= p.pick || n.pick >= h.pick)))
                for (f && !v && (!a && d > 0 || !r && 0 > d) && (d *= -1); u.disabled(n) && (Math.abs(d) > 1 && (n.month < c.month || n.month > c.month) && (n = c, d = d > 0 ? 1 : -1), n.pick <= p.pick ? (s = !0, d = 1, n = u.create([p.year, p.month, p.date + (n.pick === p.pick ? 0 : -1)])) : n.pick >= h.pick && (l = !0, d = -1, n = u.create([h.year, h.month, h.date + (n.pick === h.pick ? 0 : 1)])), !s || !l);) n = u.create([n.year, n.month, n.date + d]);
            return n
        }, n.prototype.disabled = function(e) {
            var n = this,
                i = n.item.disable.filter(function(i) {
                    return o.isInteger(i) ? e.day === (n.settings.firstDay ? i : i - 1) % 7 : t.isArray(i) || o.isDate(i) ? e.pick === n.create(i).pick : t.isPlainObject(i) ? n.withinRange(i, e) : void 0
                });
            return i = i.length && !i.filter(function(e) {
                return t.isArray(e) && "inverted" == e[3] || t.isPlainObject(e) && e.inverted
            }).length, -1 === n.item.enable ? !i : i || e.pick < n.item.min.pick || e.pick > n.item.max.pick
        }, n.prototype.parse = function(e, t, n) {
            var i = this,
                r = {};
            return t && "string" == typeof t ? (n && n.format || (n = n || {}, n.format = i.settings.format), i.formats.toArray(n.format).map(function(e) {
                var n = i.formats[e],
                    a = n ? o.trigger(n, i, [t, r]) : e.replace(/^!/, "").length;
                n && (r[e] = t.substr(0, a)), t = t.substr(a)
            }), [r.yyyy || r.yy, +(r.mm || r.m) - 1, r.dd || r.d]) : t
        }, n.prototype.formats = function() {
            function e(e, t, n) {
                var i = e.match(/\w+/)[0];
                return n.mm || n.m || (n.m = t.indexOf(i) + 1), i.length
            }

            function t(e) {
                return e.match(/\w+/)[0].length
            }
            return {
                d: function(e, t) {
                    return e ? o.digits(e) : t.date
                },
                dd: function(e, t) {
                    return e ? 2 : o.lead(t.date)
                },
                ddd: function(e, n) {
                    return e ? t(e) : this.settings.weekdaysShort[n.day]
                },
                dddd: function(e, n) {
                    return e ? t(e) : this.settings.weekdaysFull[n.day]
                },
                m: function(e, t) {
                    return e ? o.digits(e) : t.month + 1
                },
                mm: function(e, t) {
                    return e ? 2 : o.lead(t.month + 1)
                },
                mmm: function(t, n) {
                    var i = this.settings.monthsShort;
                    return t ? e(t, i, n) : i[n.month]
                },
                mmmm: function(t, n) {
                    var i = this.settings.monthsFull;
                    return t ? e(t, i, n) : i[n.month]
                },
                yy: function(e, t) {
                    return e ? 2 : ("" + t.year).slice(2)
                },
                yyyy: function(e, t) {
                    return e ? 4 : t.year
                },
                toArray: function(e) {
                    return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)
                },
                toString: function(e, t) {
                    var n = this;
                    return n.formats.toArray(e).map(function(e) {
                        return o.trigger(n.formats[e], n, [0, t]) || e.replace(/^!/, "")
                    }).join("")
                }
            }
        }(), n.prototype.isDateExact = function(e, n) {
            var i = this;
            return o.isInteger(e) && o.isInteger(n) || "boolean" == typeof e && "boolean" == typeof n ? e === n : (o.isDate(e) || t.isArray(e)) && (o.isDate(n) || t.isArray(n)) ? i.create(e).pick === i.create(n).pick : !(!t.isPlainObject(e) || !t.isPlainObject(n)) && (i.isDateExact(e.from, n.from) && i.isDateExact(e.to, n.to))
        }, n.prototype.isDateOverlap = function(e, n) {
            var i = this,
                r = i.settings.firstDay ? 1 : 0;
            return o.isInteger(e) && (o.isDate(n) || t.isArray(n)) ? (e = e % 7 + r, e === i.create(n).day + 1) : o.isInteger(n) && (o.isDate(e) || t.isArray(e)) ? (n = n % 7 + r, n === i.create(e).day + 1) : !(!t.isPlainObject(e) || !t.isPlainObject(n)) && i.overlapRanges(e, n)
        }, n.prototype.flipEnable = function(e) {
            var t = this.item;
            t.enable = e || (-1 == t.enable ? 1 : -1)
        }, n.prototype.deactivate = function(e, n) {
            var i = this,
                r = i.item.disable.slice(0);
            return "flip" == n ? i.flipEnable() : n === !1 ? (i.flipEnable(1), r = []) : n === !0 ? (i.flipEnable(-1), r = []) : n.map(function(e) {
                for (var n, a = 0; a < r.length; a += 1)
                    if (i.isDateExact(e, r[a])) {
                        n = !0;
                        break
                    }
                n || (o.isInteger(e) || o.isDate(e) || t.isArray(e) || t.isPlainObject(e) && e.from && e.to) && r.push(e)
            }), r
        }, n.prototype.activate = function(e, n) {
            var i = this,
                r = i.item.disable,
                a = r.length;
            return "flip" == n ? i.flipEnable() : n === !0 ? (i.flipEnable(1), r = []) : n === !1 ? (i.flipEnable(-1), r = []) : n.map(function(e) {
                var n, s, l, u;
                for (l = 0; a > l; l += 1) {
                    if (s = r[l], i.isDateExact(s, e)) {
                        n = r[l] = null, u = !0;
                        break
                    }
                    if (i.isDateOverlap(s, e)) {
                        t.isPlainObject(e) ? (e.inverted = !0, n = e) : t.isArray(e) ? (n = e, n[3] || n.push("inverted")) : o.isDate(e) && (n = [e.getFullYear(), e.getMonth(), e.getDate(), "inverted"]);
                        break
                    }
                }
                if (n)
                    for (l = 0; a > l; l += 1)
                        if (i.isDateExact(r[l], e)) {
                            r[l] = null;
                            break
                        }
                if (u)
                    for (l = 0; a > l; l += 1)
                        if (i.isDateOverlap(r[l], e)) {
                            r[l] = null;
                            break
                        }
                n && r.push(n)
            }), r.filter(function(e) {
                return null != e
            })
        }, n.prototype.nodes = function(e) {
            var t = this,
                n = t.settings,
                a = t.item,
                s = a.now,
                l = a.select,
                u = a.highlight,
                c = a.view,
                d = a.disable,
                f = a.min,
                p = a.max,
                h = function(e, t) {
                    return n.firstDay && (e.push(e.shift()), t.push(t.shift())), o.node("thead", o.node("tr", o.group({
                        min: 0,
                        max: i - 1,
                        i: 1,
                        node: "th",
                        item: function(i) {
                            return [e[i], n.klass.weekdays, 'scope=col title="' + t[i] + '"']
                        }
                    })))
                }((n.showWeekdaysFull ? n.weekdaysFull : n.weekdaysLetter).slice(0), n.weekdaysFull.slice(0)),
                v = function(e) {
                    return o.node("div", " ", n.klass["nav" + (e ? "Next" : "Prev")] + (e && c.year >= p.year && c.month >= p.month || !e && c.year <= f.year && c.month <= f.month ? " " + n.klass.navDisabled : ""), "data-nav=" + (e || -1) + " " + o.ariaAttr({
                        role: "button",
                        controls: t.$node[0].id + "_table"
                    }) + ' title="' + (e ? n.labelMonthNext : n.labelMonthPrev) + '"')
                },
                g = function(i) {
                    var r = n.showMonthsShort ? n.monthsShort : n.monthsFull;
                    return "short_months" == i && (r = n.monthsShort), n.selectMonths && void 0 == i ? o.node("select", o.group({
                        min: 0,
                        max: 11,
                        i: 1,
                        node: "option",
                        item: function(e) {
                            return [r[e], 0, "value=" + e + (c.month == e ? " selected" : "") + (c.year == f.year && e < f.month || c.year == p.year && e > p.month ? " disabled" : "")]
                        }
                    }), n.klass.selectMonth + " browser-default", (e ? "" : "disabled") + " " + o.ariaAttr({
                        controls: t.$node[0].id + "_table"
                    }) + ' title="' + n.labelMonthSelect + '"') : "short_months" == i ? null != l ? o.node("div", r[l.month]) : o.node("div", r[c.month]) : o.node("div", r[c.month], n.klass.month)
                },
                m = function(i) {
                    var r = c.year,
                        a = n.selectYears === !0 ? 5 : ~~(n.selectYears / 2);
                    if (a) {
                        var s = f.year,
                            l = p.year,
                            u = r - a,
                            d = r + a;
                        if (s > u && (d += s - u, u = s), d > l) {
                            var h = u - s,
                                v = d - l;
                            u -= h > v ? v : h, d = l
                        }
                        if (n.selectYears && void 0 == i) return o.node("select", o.group({
                            min: u,
                            max: d,
                            i: 1,
                            node: "option",
                            item: function(e) {
                                return [e, 0, "value=" + e + (r == e ? " selected" : "")]
                            }
                        }), n.klass.selectYear + " browser-default", (e ? "" : "disabled") + " " + o.ariaAttr({
                            controls: t.$node[0].id + "_table"
                        }) + ' title="' + n.labelYearSelect + '"')
                    }
                    return "raw" == i ? o.node("div", r) : o.node("div", r, n.klass.year)
                };
            return createDayLabel = function() {
                return null != l ? o.node("div", l.date) : o.node("div", s.date)
            }, createWeekdayLabel = function() {
                var e;
                e = null != l ? l.day : s.day;
                var t = n.weekdaysFull[e];
                return t
            }, o.node("div", o.node("div", createWeekdayLabel(), "picker__weekday-display") + o.node("div", g("short_months"), n.klass.month_display) + o.node("div", createDayLabel(), n.klass.day_display) + o.node("div", m("raw"), n.klass.year_display), n.klass.date_display) + o.node("div", o.node("div", (n.selectYears ? g() + m() : g() + m()) + v() + v(1), n.klass.header) + o.node("table", h + o.node("tbody", o.group({
                min: 0,
                max: r - 1,
                i: 1,
                node: "tr",
                item: function(e) {
                    var r = n.firstDay && 0 === t.create([c.year, c.month, 1]).day ? -7 : 0;
                    return [o.group({
                        min: i * e - c.day + r + 1,
                        max: function() {
                            return this.min + i - 1
                        },
                        i: 1,
                        node: "td",
                        item: function(e) {
                            e = t.create([c.year, c.month, e + (n.firstDay ? 1 : 0)]);
                            var i = l && l.pick == e.pick,
                                r = u && u.pick == e.pick,
                                a = d && t.disabled(e) || e.pick < f.pick || e.pick > p.pick,
                                h = o.trigger(t.formats.toString, t, [n.format, e]);
                            return [o.node("div", e.date, function(t) {
                                return t.push(c.month == e.month ? n.klass.infocus : n.klass.outfocus), s.pick == e.pick && t.push(n.klass.now), i && t.push(n.klass.selected), r && t.push(n.klass.highlighted), a && t.push(n.klass.disabled), t.join(" ")
                            }([n.klass.day]), "data-pick=" + e.pick + " " + o.ariaAttr({
                                role: "gridcell",
                                label: h,
                                selected: !(!i || t.$node.val() !== h) || null,
                                activedescendant: !!r || null,
                                disabled: !!a || null
                            })), "", o.ariaAttr({
                                role: "presentation"
                            })]
                        }
                    })]
                }
            })), n.klass.table, 'id="' + t.$node[0].id + '_table" ' + o.ariaAttr({
                role: "grid",
                controls: t.$node[0].id,
                readonly: !0
            })), n.klass.calendar_container) + o.node("div", o.node("button", n.today, "btn-flat picker__today", "type=button data-pick=" + s.pick + (e && !t.disabled(s) ? "" : " disabled") + " " + o.ariaAttr({
                controls: t.$node[0].id
            })) + o.node("button", n.clear, "btn-flat picker__clear", "type=button data-clear=1" + (e ? "" : " disabled") + " " + o.ariaAttr({
                controls: t.$node[0].id
            })) + o.node("button", n.close, "btn-flat picker__close", "type=button data-close=true " + (e ? "" : " disabled") + " " + o.ariaAttr({
                controls: t.$node[0].id
            })), n.klass.footer)
        }, n.defaults = function(e) {
            return {
                labelMonthNext: "Next month",
                labelMonthPrev: "Previous month",
                labelMonthSelect: "Select a month",
                labelYearSelect: "Select a year",
                monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                weekdaysLetter: ["S", "M", "T", "W", "T", "F", "S"],
                today: "Today",
                clear: "Clear",
                close: "Close",
                format: "d mmmm, yyyy",
                klass: {
                    table: e + "table",
                    header: e + "header",
                    date_display: e + "date-display",
                    day_display: e + "day-display",
                    month_display: e + "month-display",
                    year_display: e + "year-display",
                    calendar_container: e + "calendar-container",
                    navPrev: e + "nav--prev",
                    navNext: e + "nav--next",
                    navDisabled: e + "nav--disabled",
                    month: e + "month",
                    year: e + "year",
                    selectMonth: e + "select--month",
                    selectYear: e + "select--year",
                    weekdays: e + "weekday",
                    day: e + "day",
                    disabled: e + "day--disabled",
                    selected: e + "day--selected",
                    highlighted: e + "day--highlighted",
                    now: e + "day--today",
                    infocus: e + "day--infocus",
                    outfocus: e + "day--outfocus",
                    footer: e + "footer",
                    buttonClear: e + "button--clear",
                    buttonToday: e + "button--today",
                    buttonClose: e + "button--close"
                }
            }
        }(e.klasses().picker + "__"), e.extend("pickadate", n)
    }),
    function(e) {
        function t() {
            var t = +e(this).attr("length"),
                n = +e(this).val().length,
                i = t >= n;
            e(this).parent().find('span[class="character-counter"]').html(n + "/" + t), r(i, e(this))
        }

        function n(t) {
            var n = t.parent().find('span[class="character-counter"]');
            n.length || (n = e("<span/>").addClass("character-counter").css("float", "right").css("font-size", "12px").css("height", 1), t.parent().append(n))
        }

        function i() {
            e(this).parent().find('span[class="character-counter"]').html("")
        }

        function r(e, t) {
            var n = t.hasClass("invalid");
            e && n ? t.removeClass("invalid") : e || n || (t.removeClass("valid"), t.addClass("invalid"))
        }
        e.fn.characterCounter = function() {
            return this.each(function() {
                var r = e(this),
                    o = r.parent().find('span[class="character-counter"]');
                if (!o.length) {
                    var a = void 0 !== r.attr("length");
                    a && (r.on("input", t), r.on("focus", t), r.on("blur", i), n(r))
                }
            })
        }, e(document).ready(function() {
            e("input, textarea").characterCounter()
        })
    }(jQuery),
    function(e) {
        var t = {
            init: function(t) {
                var n = {
                    time_constant: 200,
                    dist: -100,
                    shift: 0,
                    padding: 0,
                    full_width: !1,
                    indicators: !1,
                    no_wrap: !1
                };
                return t = e.extend(n, t), this.each(function() {
                    function n() {
                        "undefined" != typeof window.ontouchstart && (N[0].addEventListener("touchstart", d), N[0].addEventListener("touchmove", f), N[0].addEventListener("touchend", p)), N[0].addEventListener("mousedown", d), N[0].addEventListener("mousemove", f), N[0].addEventListener("mouseup", p), N[0].addEventListener("mouseleave", p), N[0].addEventListener("click", u)
                    }

                    function i(e) {
                        return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientX : e.clientX
                    }

                    function r(e) {
                        return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientY : e.clientY
                    }

                    function o(e) {
                        return e >= x ? e % x : 0 > e ? o(x + e % x) : e
                    }

                    function a(e) {
                        var n, i, r, a, s, l, u;
                        if (v = "number" == typeof e ? e : v, g = Math.floor((v + b / 2) / b), r = v - g * b, a = 0 > r ? 1 : -1, s = -a * r * 2 / b, i = x >> 1, t.full_width ? u = "translateX(0)" : (u = "translateX(" + (N[0].clientWidth - item_width) / 2 + "px) ", u += "translateY(" + (N[0].clientHeight - item_width) / 2 + "px)"), I) {
                            var c = g % x,
                                d = j.find(".indicator-item.active");
                            d.index() !== c && (d.removeClass("active"), j.find(".indicator-item").eq(c).addClass("active"))
                        }
                        for ((!t.no_wrap || g >= 0 && x > g) && (l = h[o(g)], l.style[E] = u + " translateX(" + -r / 2 + "px) translateX(" + a * t.shift * s * n + "px) translateZ(" + t.dist * s + "px)", l.style.zIndex = 0, t.full_width ? tweenedOpacity = 1 : tweenedOpacity = 1 - .2 * s, l.style.opacity = tweenedOpacity, l.style.display = "block"), n = 1; i >= n; ++n) t.full_width ? (zTranslation = t.dist, tweenedOpacity = n === i && 0 > r ? 1 - s : 1) : (zTranslation = t.dist * (2 * n + s * a), tweenedOpacity = 1 - .2 * (2 * n + s * a)), (!t.no_wrap || x > g + n) && (l = h[o(g + n)], l.style[E] = u + " translateX(" + (t.shift + (b * n - r) / 2) + "px) translateZ(" + zTranslation + "px)", l.style.zIndex = -n, l.style.opacity = tweenedOpacity, l.style.display = "block"), t.full_width ? (zTranslation = t.dist,
                            tweenedOpacity = n === i && r > 0 ? 1 - s : 1) : (zTranslation = t.dist * (2 * n - s * a), tweenedOpacity = 1 - .2 * (2 * n - s * a)), (!t.no_wrap || g - n >= 0) && (l = h[o(g - n)], l.style[E] = u + " translateX(" + (-t.shift + (-b * n - r) / 2) + "px) translateZ(" + zTranslation + "px)", l.style.zIndex = -n, l.style.opacity = tweenedOpacity, l.style.display = "block");
                        (!t.no_wrap || g >= 0 && x > g) && (l = h[o(g)], l.style[E] = u + " translateX(" + -r / 2 + "px) translateX(" + a * t.shift * s + "px) translateZ(" + t.dist * s + "px)", l.style.zIndex = 0, t.full_width ? tweenedOpacity = 1 : tweenedOpacity = 1 - .2 * s, l.style.opacity = tweenedOpacity, l.style.display = "block")
                    }

                    function s() {
                        var e, t, n, i;
                        e = Date.now(), t = e - A, A = e, n = v - P, P = v, i = 1e3 * n / (1 + t), S = .8 * i + .2 * S
                    }

                    function l() {
                        var e, n;
                        T && (e = Date.now() - A, n = T * Math.exp(-e / t.time_constant), n > 2 || -2 > n ? (a(k - n), requestAnimationFrame(l)) : a(k))
                    }

                    function u(n) {
                        if (D) return n.preventDefault(), n.stopPropagation(), !1;
                        if (!t.full_width) {
                            var i = e(n.target).closest(".carousel-item").index(),
                                r = g % x - i;
                            0 !== r && (n.preventDefault(), n.stopPropagation()), c(i)
                        }
                    }

                    function c(e) {
                        var n = g % x - e;
                        t.no_wrap || (0 > n ? Math.abs(n + x) < Math.abs(n) && (n += x) : n > 0 && Math.abs(n - x) < n && (n -= x)), 0 > n ? N.trigger("carouselNext", [Math.abs(n)]) : n > 0 && N.trigger("carouselPrev", [n])
                    }

                    function d(e) {
                        m = !0, D = !1, q = !1, w = i(e), C = r(e), S = T = 0, P = v, A = Date.now(), clearInterval(O), O = setInterval(s, 100)
                    }

                    function f(e) {
                        var t, n, o;
                        if (m)
                            if (t = i(e), y = r(e), n = w - t, o = Math.abs(C - y), 30 > o && !q)(n > 2 || -2 > n) && (D = !0, w = t, a(v + n));
                            else {
                                if (D) return e.preventDefault(), e.stopPropagation(), !1;
                                q = !0
                            }
                        return D ? (e.preventDefault(), e.stopPropagation(), !1) : void 0
                    }

                    function p(e) {
                        return m ? (m = !1, clearInterval(O), k = v, (S > 10 || -10 > S) && (T = .9 * S, k = v + T), k = Math.round(k / b) * b, t.no_wrap && (k >= b * (x - 1) ? k = b * (x - 1) : 0 > k && (k = 0)), T = k - v, A = Date.now(), requestAnimationFrame(l), D && (e.preventDefault(), e.stopPropagation()), !1) : void 0
                    }
                    var h, v, g, m, b, x, w, C, T, k, S, E, P, A, O, D, q, j = e('<ul class="indicators"></ul>'),
                        N = e(this),
                        I = N.attr("data-indicators") || t.indicators;
                    if (N.hasClass("initialized")) return e(this).trigger("carouselNext", [1e-6]), !0;
                    if (t.full_width) {
                        t.dist = 0;
                        var L = N.find(".carousel-item img").first();
                        L.length ? imageHeight = L.load(function() {
                            N.css("height", e(this).height())
                        }) : (imageHeight = N.find(".carousel-item").first().height(), N.css("height", imageHeight)), I && N.find(".carousel-fixed-item").addClass("with-indicators")
                    }
                    N.addClass("initialized"), m = !1, v = k = 0, h = [], item_width = N.find(".carousel-item").first().innerWidth(), b = 2 * item_width + t.padding, N.find(".carousel-item").each(function(t) {
                        if (h.push(e(this)[0]), I) {
                            var n = e('<li class="indicator-item"></li>');
                            0 === t && n.addClass("active"), n.click(function() {
                                var t = e(this).index();
                                c(t)
                            }), j.append(n)
                        }
                    }), I && N.append(j), x = h.length, E = "transform", ["webkit", "Moz", "O", "ms"].every(function(e) {
                        var t = e + "Transform";
                        return "undefined" == typeof document.body.style[t] || (E = t, !1)
                    }), window.onresize = a, n(), a(v), e(this).on("carouselNext", function(e, t) {
                        void 0 === t && (t = 1), k = v + b * t, v !== k && (T = k - v, A = Date.now(), requestAnimationFrame(l))
                    }), e(this).on("carouselPrev", function(e, t) {
                        void 0 === t && (t = 1), k = v - b * t, v !== k && (T = k - v, A = Date.now(), requestAnimationFrame(l))
                    }), e(this).on("carouselSet", function(e, t) {
                        void 0 === t && (t = 0), c(t)
                    })
                })
            },
            next: function(t) {
                e(this).trigger("carouselNext", [t])
            },
            prev: function(t) {
                e(this).trigger("carouselPrev", [t])
            },
            set: function(t) {
                e(this).trigger("carouselSet", [t])
            }
        };
        e.fn.carousel = function(n) {
            return t[n] ? t[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void e.error("Method " + n + " does not exist on jQuery.carousel") : t.init.apply(this, arguments)
        }
    }(jQuery);
var currency = "Litecoin",
    list = [{
        name: "Winltc",
        pay: "900 litoshis",
        time: 3,
        link: "http://winltc.getfree.ml/"
    }, {
        name: "Litecoin Voyager",
        pay: "350 litoshis",
        time: 5,
        link: "http://litecoin.dogecoinspace.us/"
    }, {
        name: "Coins4free",
        pay: "1000 litoshis",
        time: 5,
        link: "http://lite.coins4free.club/"
    }, {
        name: "Bitcoin-s",
        pay: "1000 litoshis",
        time: 5,
        link: "http://www.bitcoin-s.com/litecoin/"
    }, {
        name: "Konstantinova Litecoin",
        pay: "1000 litoshis",
        time: 5,
        link: "https://www.konstantinova.net/litecoin/"
    }, {
        name: "xFaucet Litecoin",
        pay: "1000 litoshis",
        time: 5,
        link: "https://www.xfaucet.net/litecoin/"
    }, {
        name: "Litecoin Win",
        pay: "1500 litoshis",
        time: 5,
        link: "http://freesatoshisfh.us/litecoin/"
    }, {
        name: "LTC ghost",
        pay: "2200 litoshis",
        time: 30,
        link: "http://noticrypto.website/ltccut/"
    }];
$(document).ready(function() {
    create(), init(), $(".button-collapse").sideNav(), $(".claim").click(function(e) {
        var t = $(e.target).attr("data-id"),
            n = list[t],
            i = Date.now();
        timer(t, 60 * n.time + 60), localStorage.setItem("faucet-" + n.name, i), window.open(n.link, "_blank")
    }), $(".reset").click(function(e) {
        var t = $(e.target).attr("data-id"),
            n = list[t];
        localStorage.removeItem("faucet-" + n.name), $(e.target).css("display", "none"), $("#claim-" + t).css("display", "initial"), document.querySelector('tr[data-id="' + t + '"] > td.time > div.countdown').innerHTML = convertTime(60 * n.time)
    }), $("#switch-notification").change(function(e) {
        $("#switch-notification")[0].checked ? (getPermissionNotification(), localStorage.setItem("switch-notification", !0)) : localStorage.removeItem("switch-notification")
    })
});