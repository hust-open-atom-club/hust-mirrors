# Auto-generated script for Oh My Zsh
# Generated from: ohmyzsh.git.md
# Mirror ID: oh-my-zsh



_oh-my-zsh_install_1() {
	# Test and execute
	# Test conditions
	has_command omz && return 1 || {
		print_warning "Test condition failed: has_command omz && return 1"
	}

	# Execute commands
	REMOTE=$http://$domain/git/ohmyzsh.git sh -c "$(curl -fsSL $http://$domain/ohmyzsh.git/install.sh)"

	return 0
}

_oh-my-zsh_install_2() {
	# Test and execute
	# Test conditions
	has_command omz || {
		print_warning "Test condition failed: has_command omz"
	}

	# Execute commands
	git -C $ZSH remote set-url origin $http://$domain/git/ohmyzsh.git
	git -C $ZSH pull

	return 0
}

install() {

	_oh-my-zsh_install_1 || return 1
	_oh-my-zsh_install_2 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."


	print_success "Recovery completed"
}
