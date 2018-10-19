module.exports = {

	//Done
	insertUser : function(data){
		return "INSERT INTO usuario (nome, cidade, email, senha, visibilidade) VALUES('"+data[0]+"', '"+data[1]+"', '"+data[2]+"', '"+data[3]+"', '"+data[4]+"')";
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
	inserOne : function (table, campo, data){
		return "INSERT  INTO '"+table+"' '"+campo+"' VALUES "+data;
		
	},
	
	insertPostText : function(data){
		return "INSERT INTO postagem (legenda, texto, id_usuario) VALUES ('"+data[0]+"', '"+data[1]+"', "+data[2]+")";
	},

	insertPostText : function(image, data){
		return "INSERT INTO postagem (legenda, id_usuario) VALUES ('"+data[0]+"', '"+data[1]+"', '"+data[2]+"')";
	},

	insertFeed : function (id_user, id_post){
		return "INSERT INTO feed (id_usuario, id_postagem) VALUES ("+id_user+", "+id_post+")";
 
	},

	findPost : function (id)
	{
		return "SELECT postagem.* FROM feed INNER JOIN postagem ON postagem.id = feed.postagem_id WHERE feed.usuario_id = usuario."+id;

	},
	updateOne : function(table, id, campo, dado){
		return "UPDATE "+ table +" SET "+table+" = '"+dado+"' WHERE id = " +id
	},
	findUser : function(table, name){
		return "SELECT usuario WHERE usuario.nome = "+name
	},
	
	deleteOne : function(table, id){
		return "DELETE FROM "+ table +" WHERE id = "+id;
	}, 

	insertFeedGroup : function(table, id){
		return "INSERT INTO feed_grupo (legenda, texto, id_grupo, id_usuario) VALUES ('"+data[0]+"', '"+data[1]+"', "+data[2]+", "+data[3]+")";
	}, 
	
	acceptFriend : function(table, value, id_user1, id_user2){
		return "UPDATE amizade SET status = "+value+" WHERE id_usuario2 = "+id_user2+" AND id_usuario1 = "+id_user1;
	},

	deleteSolicit : function(id_user1, id_user2){
		return "DELETE FROM amizade WHERE id_usuario2 = "+id_user2+" AND id_usuario1 = "+id_user1;
	}, 

	blockFriend : function(value, id_user1, id_user2){
		return "UPDATE amizade SET bloqueado = "+value+" WHERE (id_usuario2 = "+id_user2+" AND id_usuario1 = "+id_user1+") OR (id_usuario1 = "+id_user2+" AND id_usuario2 = "+id_user1+")";
	}, 

	undoFriend : function(id_user1, id_user2){
		return "DELETE FROM "+ table +" WHERE (id_usuario2 = "+id_user2+" AND id_usuario1 = "+id_user1+") OR (id_usuario1 = "+id_user2+" AND id_usuario2 = "+id_user1+")";
	},

	acceptMember :  function(value, id_user, id_group){
		return "UPDATE membro_grupo SET EhMembro = "+value+" WHERE (id_usuario = "+id_user+" AND id_grupo = "+id_group+")";
	}, 

	rejectMember : function( id_user, id_group){
		return "DELETE FROM membro_grupo WHERE id_usuario = "+id_user+" AND id_grupo = "+id_group;
	},

	blockMember : function(value, id_user, id_user2, id_group){
		return "UPDATE membro_grupo SET bloqueado = "+value+" WHERE (id_usuario = "+id_user+" AND id_grupo = "+id_group+")";
	}, 

	undoMember : function(id_user1, id_user2){
		return "DELETE FROM "+ table +" WHERE (id_usuario2 = "+id_user2+" AND id_usuario1 = "+id_user1+") OR (id_usuario1 = "+id_user2+" AND id_usuario2 = "+id_user1+")";
	},







	
	
}

