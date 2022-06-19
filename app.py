import os,click
from flask import Flask,render_template,url_for,request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////' + os.path.join(app.root_path, 'data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.context_processor
def inject_user():
    user = User.query.first()
    return dict(user=user)

# @app.route('/add', methods=['GET', 'POST'])
# def add():
#     if request.method == 'POST':
#         a = request.form.get('name_a')
#         b = request.form.get('name_b')
#         result = int(a) + int(b)
#     else:
#         result = '请输入a b以计算'
#     return render_template('add.html',result=result)

##路由
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ndvi')
def ndvi():
    return render_template('ndvi.html')

@app.route('/tem')
def tem():
    return render_template('ndvi.html')

@app.route('/pre')
def pre():
    return render_template('ndvi.html')

@app.route('/pop')
def pop():
    return render_template('ndvi.html')

@app.route('/gdp')
def gdp():
    return render_template('ndvi.html')

@app.route('/analy')
def analy():
    return render_template('ndvi.html')

##数据库模型
#用户
class User(db.Model):  # 表名将会是 user (自动生成，小写处理）
    id = db.Column(db.Integer, primary_key=True)  # 主键
    name = db.Column(db.String(20))  # 名字

#记录--NDVI
class NDVI_Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10))
    filename = db.Column(db.String(200))

#记录--TEM温度
class TEM_Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10))
    filename = db.Column(db.String(200))

#记录--PRE降水
class PRE_Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10))
    filename = db.Column(db.String(200))

#记录--人口POP
class POP_Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10))
    filename = db.Column(db.String(200))

#记录--经济GDP
class GDP_Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10))
    filename = db.Column(db.String(200))

##flask命令
#创建数据库表
@app.cli.command()  # 注册为命令
@click.option('--drop', is_flag=True, help='Create after drop.')  # 设置选项
def initdb(drop):
    """Initialize the database."""
    if drop:  # 判断是否输入了选项
        db.drop_all()
    db.create_all()
    click.echo('Initialized database.')  # 输出提示信息

#添加记录到数据库
@app.cli.command()
def forge():
    """Generate fake data."""
    db.create_all()

    name = 'sunergao'
    ndvi_data = [
        {'date': '200101', 'filename': '/home/sunergao/flaskweb/static/images/2010_01.png'},
        {'date': '200102', 'filename': '/home/sunergao/flaskweb/static/images/2010_02.png'},
    ]

    user = User(name=name) # 创建一个 User 记录
    db.session.add(user) # 把新创建的记录添加到数据库会话
    for ndvi in ndvi_data:
        ndvi2 = NDVI_Data(date=ndvi['date'], filename=ndvi['filename'])
        db.session.add(ndvi2)

    db.session.commit() # 提交数据库会话
    click.echo('Done.')