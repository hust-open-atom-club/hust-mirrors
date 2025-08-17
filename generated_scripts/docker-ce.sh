# Auto-generated script for Docker CE
# Generated from: docker-ce.md
# Mirror ID: docker-ce



_docker-ce_install_1() {
	# Execute commands
	set_sudo

	# Execute commands
	$sudo curl -fsSL https://get.docker.com -o get-docker.sh
	$sudo DOWNLOAD_URL=$http://$domain/docker-ce sh get-docker.sh

	return 0
}

install() {

	_docker-ce_install_1 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."


	print_success "Recovery completed"
}
