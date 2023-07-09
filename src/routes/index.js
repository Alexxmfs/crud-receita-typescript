"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const app = require("teem");
class IndexRoute {
    async index(req, res) {
        res.render("index/index");
    }
    async sobre(req, res) {
        res.render("index/sobre");
    }
    async cadastro(req, res) {
        res.render("index/cadastro");
    }
    async receitas(req, res) {
        let receitas;
        await app.sql.connect(async (sql) => {
            receitas = await sql.query("SELECT idreceita, titulo, ingrediente, utensilio, ModoPreparo, categoria FROM receita");
        });
        res.render("index/receitas", {
            receitas: receitas
        });
    }
    async criar(req, res) {
        let receitas = req.body;
        if (!receitas) {
            res.status(400).json("receita inválido");
            return;
        }
        if (!receitas.titulo) {
            res.status(400).json("Marca do receita inválido");
            return;
        }
        if (!receitas.ingrediente) {
            res.status(400).json("Modelo do receita inválido");
            return;
        }
        if (!receitas.utensilio) {
            res.status(400).json("Cor do receita inválido");
            return;
        }
        if (!receitas.ModoPreparo) {
            res.status(400).json("Ano do receita inválido");
            return;
        }
        let imagem = req.uploadedFiles["imagem"];
        if (!imagem) {
            res.status(400).json("Imagem inválida");
            return;
        }
        await app.sql.connect(async (sql) => {
            await sql.beginTransaction();
            await sql.query("INSERT INTO receita (titulo, ingrediente, utensilio, ModoPreparo, categoria) VALUES (?, ?, ?, ?, ?)", [receitas.titulo, receitas.ingrediente, receitas.utensilio, receitas.ModoPreparo, receitas.categoria]);
            let idreceita = await sql.scalar("SELECT last_insert_id()");
            app.fileSystem.saveUploadedFile("/public/img/receitas/" + idreceita + ".jpg", imagem);
            await sql.commit();
        });
        return null;
    }
}
__decorate([
    app.http.post(),
    app.route.formData()
], IndexRoute.prototype, "criar", null);
module.exports = IndexRoute;
//# sourceMappingURL=index.js.map