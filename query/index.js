module.exports = {

	//Done
	insertUser : function(data){
		return "INSERT INTO usuario (nome, cidade, email, senha, visibilidade) VALUES('"+data[0]+"', '"+data[1]+"', '"+data[2]+"', '"+data[3]+"', "+data[4]+")";
	},
	//Users and groups in the plataform
	//done
	findAll : function(table){
		return "SELECT * FROM "+table;
	},
	//find anything with attribute ID
	//findUserSolicitations
	//findGroupsSolicitations
	//findUserInGroups
	//findComents
	//findComentsofComents
	//findComentsinGroups
	//findComentsofComentsinGroups
	//findAdminGroups
	//getUser
	//done
	findOne : function(table, collumn, id){
		return "SELECT "+collumn+" FROM "+table+" WHERE id = "+id;
	},
	//done
	findMyFriends : function(id_user){
		return "SELECT * FROM amizade WHERE (id_usuario1 = "+id_user+") OR (id_usuario2 = "+id_user+") ";
	},
	//done
	insertPostText : function(data){
		return "INSERT INTO postagem (legenda, texto, id_usuario) VALUES ('"+data[0]+"', '"+data[1]+"', "+data[2]+")";
	},
	//done
	insertFeed : function (id_user, id_post){
		return "INSERT INTO feed (id_usuario, id_postagem) VALUES ("+id_user+", "+id_post+")";
	},
	//done
	findPost : function (id_user)
	{
		return "SELECT id_postagem FROM feed WHERE feed.id_usuario = "+id_user;	

	},
	//done
	updateOne : function(id, data){
		return "UPDATE usuario SET email = '"+data+"' WHERE usuario.id = "+id;
	},
	//done
	findUser : function(){
		return "SELECT * FROM usuario WHERE nome = ?";
	},
	
	deleteOne : function( id_user){
		return "DELETE FROM usuario WHERE id ="+id_user;
	}, 
	//done
	insertFeedGroup : function (data){
		return "INSERT INTO feed_grupo (descricao, texto, id_grupo, id_usuario) VALUES ('"+data[0]+"', '"+data[1]+"', "+data[2]+", "+data[3]+")";
	}, 
	//done
	acceptFriend : function( value, id_user1, id_user2){
		return "UPDATE amizade SET status = "+value+" WHERE (id_usuario2 = "+id_user2+" AND id_usuario1 = "+id_user1+")";
	},
	//done
	deleteSolicit : function(id_user1, id_user2){
		return "DELETE FROM amizade WHERE (id_usuario2 = "+id_user2+" AND id_usuario1 = "+id_user1+")";
	}, 
	//done
	blockFriend : function(value, id_user1, id_user2){
		return "UPDATE amizade SET bloqueado = "+value+" WHERE (id_usuario2 = "+id_user2+" AND id_usuario1 = "+id_user1+") OR (id_usuario1 = "+id_user2+" AND id_usuario2 = "+id_user1+")";
	}, 
	//done
	undoFriend : function(id_user1, id_user2){
		return "DELETE FROM amizade WHERE (id_usuario2 = "+id_user2+" AND id_usuario1 = "+id_user1+") OR (id_usuario1 = "+id_user2+" AND id_usuario2 = "+id_user1+")";
	},
	//done
	acceptMember :  function(value, id_user, id_group){
		return "UPDATE membro_grupo SET EhMembro = "+value+" WHERE (id_usuario = "+id_user+" AND id_grupo = "+id_group+")";
	}, 
	//done
	rejectMember : function( id_user, id_group){
		return "DELETE FROM membro_grupo WHERE id_usuario = "+id_user+" AND id_grupo = "+id_group;
	},
	//done
	blockMember : function(value, id_user, id_group){
		return "UPDATE membro_grupo SET bloqueado = "+value+" WHERE (id_usuario = "+id_user+" AND id_grupo = "+id_group+")";
	}, 
	//done
	undoMember : function(id_user, id_group){
		return "DELETE FROM membro_grupo WHERE (id_usuario = "+id_user+" AND id_grupo = "+id_group+")";
	},
	//done
	insertSolicitFriend :  function (id_user1, id_user2, sts){
		return "INSERT INTO amizade (id_usuario1, id_usuario2, status) VALUES ("+id_user1+", "+id_user2+", "+sts+")";
	}, 
	//done
	insertSolicitGrupo :  function (id_user, id_group, EhMember){
		return "INSERT INTO membro_grupo (id_usuario, id_grupo, EhMembro) VALUES ("+id_user+", "+id_group+", "+EhMember+")";
	}, 








	
	
}

