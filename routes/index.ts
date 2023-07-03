import app = require("teem");

class IndexRoute {
	public async home(req: app.Request, res: app.Response) {
		res.render("index/home");
	}

	public async sobre(req: app.Request, res: app.Response) {
		res.render("index/sobre");
	}

	public async cadastro(req: app.Request, res: app.Response) {
		res.render("index/cadastro");
	}
 
	public async receitas(req: app.Request, res: app.Response) {
		let receitas: any[];

		await app.sql.connect(async (sql: app.Sql) => {
            receitas = await sql.query("SELECT idreceita, titulo, ingrediente, utensilio, ModoPreparo, categoria FROM receita");
        });

		res.render("index/receitas", {
			receitas: receitas
		});
	}

	@app.http.post()
    @app.route.formData()
    public async criar(req: app.Request, res: app.Response) {
        let veiculo = req.body;
	  
		if (!veiculo) {
            res.status(400).json("Veículo inválido");
			return;
        }

        if (!veiculo.titulo) {
            res.status(400).json("Marca do veículo inválido");
			return;
        }

        if (!veiculo.ingrediente) {
            res.status(400).json("Modelo do veículo inválido");
			return;
        }

        if (!veiculo.utensilio) {
            res.status(400).json("Cor do veículo inválido");
			return;
        }

        if (!veiculo.ModoPreparo) {
            res.status(400).json("Ano do veículo inválido");
			return;
        }

		let imagem = req.uploadedFiles["imagem"];
		if (!imagem) {
            res.status(400).json("Imagem inválida");
			return;
		}

		await app.sql.connect(async (sql: app.Sql) => {
            await sql.beginTransaction();

            await sql.query("INSERT INTO receita (titulo, ingrediente, utensilio, ModoPreparo, categoria) VALUES (?, ?, ?, ?, ?)", [veiculo.titulo, veiculo.ingrediente, veiculo.utensilio, veiculo.ModoPreparo, veiculo.categoria]);

            let idreceita = await sql.scalar("SELECT last_insert_id()");

            app.fileSystem.saveUploadedFile("/public/img/receitas/" + idreceita + ".jpg", imagem);

            await sql.commit();
        });

        return null;
    }
}

export = IndexRoute;