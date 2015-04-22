/**
 * @author: nthienan
 * @created: Mar 23, 2015
 */

package agu.thesis2015.service;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import agu.thesis2015.domain.Song;
import agu.thesis2015.model.Response;

public interface SongService {

	Response getAll(String username);

	Response getById(String username, String id);

	Response insert(String username, Song song);

	Response update(String username, Song song);

	Response deleteAll(String username, HttpServletRequest request);

	Response deleteOne(String username, String id, HttpServletRequest request);

	Response deleteMulti(String username, List<String> ids, HttpServletRequest request);

	Response search(String username, String keyword, int page, int size, String sort, String field);

	Response upload(String username, String name, String gener, String artist, String musician, boolean shared, MultipartFile file, HttpServletRequest request);

	void downloadFile(String songId, HttpServletRequest request, HttpServletResponse response);

	Response paging(String username, int page, int size, String sort, String field);

	Response updateView(String songId);

	Response updateDownload(String songId);

	Response shared(String username, String songId);

	Response unShared(String username, String songId);

	Response getShare(int page, int size, String sort, String field);
}
