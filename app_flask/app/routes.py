from flask import Blueprint, request, jsonify
from .models import db, Usuario

api = Blueprint('api', __name__)

@api.route('/tasks', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([{
        'id': usuario.id,
        '_name': usuario._name if len(usuario._name) <= 10 else usuario._name[:10] + '...',
        'email': usuario.email,
        'age': usuario.age
    } for usuario in usuarios])

@api.route('/tasks/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    return jsonify({
        'id': usuario.id,
        '_name': usuario._name,
        'email': usuario.email,
        'age': usuario.age
    })

@api.route('/tasks', methods=['POST'])
def create_user():
    data = request.json
    new_usuario = Usuario(_name=data['_name'], email=data['email'], age=data['age'])
    db.session.add(new_usuario)
    db.session.commit()
    return jsonify({'id': new_usuario.id, '_name': new_usuario._name, 'email': new_usuario.email,'age': new_usuario.age}), 201

@api.route('/tasks/<int:id>', methods=['PUT'])
def update_usuario(id):
    data = request.json
    usuario = Usuario.query. get_or_404(id)
    usuario._name = data['_name']
    usuario.email = data['email']
    usuario.age = data['age']
    db.session.commit()
    return jsonify({'id': usuario.id,'_name': usuario._name,'email': usuario.email,'age': usuario.age})

@api.route('/tasks/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    db.session.delete(usuario)
    db.session.commit()
    return '', 204

@api.route('/usuarios/count', methods=['GET'])
def count_usuarios():
    count = Usuario.query.count()
    return jsonify({'total_usuarios': count})