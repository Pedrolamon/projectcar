from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__,)

# Função para consultar as marcas usando a API Parallelum

@app.route("/", methods=["GET", "POST"])
def home():
  return render_template('principal.html')

@app.route("/index", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route('/principal') 
def principal(): 
    return render_template('principal.html') 

@app.route('/login') 
def login(): 
    return render_template('login.html') 

@app.route('/produtos') 
def produtos(): 
    return render_template('produtos.html') 

@app.route('/projeto') 
def projeto(): 
    return render_template('projeto.html') 


if __name__ == "__main__":
    app.run(debug=True)
